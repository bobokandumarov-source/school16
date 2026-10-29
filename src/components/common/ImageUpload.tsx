import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon, Link as LinkIcon, Check } from 'lucide-react';

interface ImageUploadProps {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  helperText?: string;
  className?: string;
  aspectRatio?: 'square' | 'portrait' | 'video' | 'wide';
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  value,
  onChange,
  helperText = 'Select a JPG, PNG or WEBP image file',
  className = '',
  aspectRatio = 'portrait',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [useUrlMode, setUseUrlMode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Compress, upload to server disk, and return persistent clean URL
  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPG, PNG or WEBP)');
      return;
    }

    setIsProcessing(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = async () => {
        // Limit max dimensions to 1600px to ensure crisp quality while optimizing storage
        const maxDimension = 1600;
        let width = img.width;
        let height = img.height;

        if (width > height && width > maxDimension) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else if (height > maxDimension) {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        let processedDataUrl = e.target?.result as string;
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          processedDataUrl = canvas.toDataURL(file.type === 'image/png' ? 'image/png' : 'image/jpeg', 0.88);
        }

        // Upload to server disk (/api/upload) so image is permanently saved on computer hard drive
        try {
          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ base64: processedDataUrl, filename: file.name }),
          });

          if (res.ok) {
            const data = await res.json();
            if (data && data.url) {
              onChange(data.url);
              setIsProcessing(false);
              return;
            }
          }
        } catch (uploadErr) {
          console.warn('[ImageUpload] Direct server upload fallback to data URL', uploadErr);
        }

        onChange(processedDataUrl);
        setIsProcessing(false);
      };

      img.onerror = () => {
        onChange(e.target?.result as string);
        setIsProcessing(false);
      };

      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClear = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const aspectClass = 
    aspectRatio === 'square' ? 'aspect-square' :
    aspectRatio === 'video' ? 'aspect-video' :
    aspectRatio === 'wide' ? 'aspect-[21/9]' :
    'aspect-[3/4]';

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setUseUrlMode(!useUrlMode)}
          className="text-[11px] text-school-navy font-semibold hover:text-school-gold transition-colors flex items-center gap-1"
        >
          {useUrlMode ? (
            <>
              <Upload className="w-3 h-3" />
              <span>Switch to file upload</span>
            </>
          ) : (
            <>
              <LinkIcon className="w-3 h-3" />
              <span>Enter URL</span>
            </>
          )}
        </button>
      </div>

      {useUrlMode ? (
        <div className="space-y-2">
          <input
            type="text"
            placeholder="https://... enter image URL"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-school-navy/20 focus:border-school-navy"
          />
          {value && (
            <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 max-h-48 flex items-center justify-center">
              <img src={value} alt="Preview" className="max-h-48 w-auto object-contain" />
              <button
                type="button"
                onClick={handleClear}
                className="absolute top-2 right-2 p-1 bg-rose-600 text-white rounded-full hover:bg-rose-700 shadow"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          {value ? (
            /* Uploaded Image Preview */
            <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200 bg-school-bg-secondary p-2 group">
              <div className={`w-full ${aspectClass} max-h-64 rounded-xl overflow-hidden bg-slate-900/5 flex items-center justify-center relative`}>
                <img
                  src={value}
                  alt="Uploaded preview"
                  className="w-full h-full object-cover rounded-xl"
                />
                
                {/* Hover overlay with action buttons */}
                <div className="absolute inset-0 bg-school-navy-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-xs">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 bg-white text-school-navy rounded-lg text-xs font-bold shadow hover:bg-slate-100 transition-colors flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Change Image</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleClear}
                    className="px-3 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-bold shadow hover:bg-rose-700 transition-colors flex items-center gap-1.5"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>

              <div className="mt-2 px-1 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                  <Check className="w-3.5 h-3.5" /> Image successfully uploaded
                </span>
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-rose-600 hover:underline font-medium text-[11px]"
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            /* Empty Upload Dropzone */
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 ${
                isDragging
                  ? 'border-school-navy bg-school-bg-secondary scale-[1.01]'
                  : 'border-slate-300 hover:border-school-gold bg-slate-50/70 hover:bg-school-bg-secondary'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-white shadow-subtle border border-slate-200 text-school-navy flex items-center justify-center mx-auto mb-3">
                {isProcessing ? (
                  <div className="w-5 h-5 border-2 border-school-navy border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Upload className="w-6 h-6 text-school-gold" />
                )}
              </div>

              <div className="text-xs sm:text-sm font-bold text-school-navy mb-1">
                {isProcessing ? 'Processing image...' : 'Click to select image file'}
              </div>
              <p className="text-[11px] text-slate-500 max-w-xs mx-auto mb-2">
                or drag & drop JPG / PNG file directly here
              </p>
              <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold bg-slate-200/80 text-slate-700">
                JPG, PNG, WEBP
              </span>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}

      {helperText && (
        <p className="text-[11px] text-slate-400">
          {helperText}
        </p>
      )}
    </div>
  );
};

export interface MultiImageUploadProps {
  label: string;
  images: string[];
  onChange: (images: string[]) => void;
  helperText?: string;
  maxImages?: number;
}

export const MultiImageUpload: React.FC<MultiImageUploadProps> = ({
  label,
  images = [],
  onChange,
  helperText = 'Add one or more JPG / PNG image files to the gallery',
  maxImages,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsProcessing(true);
    const fileList = Array.from(files).filter((file) => file.type.startsWith('image/'));
    const newUploadedUrls: string[] = [];

    for (const file of fileList) {
      try {
        const rawDataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        // Resize and optimize
        const optimizedDataUrl = await new Promise<string>((resolve) => {
          const img = new Image();
          img.onload = () => {
            const maxDimension = 1600;
            let width = img.width;
            let height = img.height;
            if (width > height && width > maxDimension) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else if (height > maxDimension) {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              resolve(canvas.toDataURL(file.type === 'image/png' ? 'image/png' : 'image/jpeg', 0.88));
            } else {
              resolve(rawDataUrl);
            }
          };
          img.onerror = () => resolve(rawDataUrl);
          img.src = rawDataUrl;
        });

        // Upload to server disk /api/upload
        try {
          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ base64: optimizedDataUrl, filename: file.name }),
          });

          if (res.ok) {
            const data = await res.json();
            if (data && data.url) {
              newUploadedUrls.push(data.url);
              continue;
            }
          }
        } catch (uploadErr) {
          console.warn('[MultiImageUpload] Server upload error, using data url', uploadErr);
        }

        newUploadedUrls.push(optimizedDataUrl);
      } catch (err) {
        console.warn('[MultiImageUpload] Processing error for file', file.name, err);
      }
    }

    const combined = [...images, ...newUploadedUrls];
    onChange(maxImages ? combined.slice(0, maxImages) : combined);
    setIsProcessing(false);
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
          {label} ({images.length} {images.length === 1 ? 'photo' : 'photos'})
        </label>
        <button
          type="button"
          disabled={isProcessing}
          onClick={() => fileInputRef.current?.click()}
          className="px-3 py-1 rounded-lg bg-school-navy text-white text-xs font-bold hover:bg-school-navy-dark transition-colors flex items-center gap-1.5 disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <Upload className="w-3.5 h-3.5 text-school-gold" />
              <span>Add Photos</span>
            </>
          )}
        </button>
      </div>

      {images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {images.map((img, idx) => (
            <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 bg-slate-100 group">
              <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute top-1.5 right-1.5 p-1 bg-rose-600/90 text-white rounded-full hover:bg-rose-700 shadow opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove photo"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 rounded-xl p-5 text-center cursor-pointer hover:border-school-gold bg-slate-50 hover:bg-school-bg-secondary transition-colors"
        >
          <ImageIcon className="w-8 h-8 text-slate-400 mx-auto mb-1" />
          <p className="text-xs text-slate-600 font-semibold">Select photos for the gallery</p>
          <p className="text-[11px] text-slate-400">You can upload multiple JPG/PNG photos simultaneously</p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/png, image/jpeg, image/jpg, image/webp"
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
      />
      {helperText && <p className="text-[11px] text-slate-400">{helperText}</p>}
    </div>
  );
};
