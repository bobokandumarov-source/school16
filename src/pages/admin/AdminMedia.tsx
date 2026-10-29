import React, { useState } from 'react';
import { Image as ImageIcon, Upload, Copy, Check, Trash2, FileText, ExternalLink, Plus } from 'lucide-react';
import { useSchoolData } from '../../lib/store';
import { ImageUpload } from '../../components/common/ImageUpload';

export const AdminMedia: React.FC = () => {
  const { mediaAssets, addMediaAsset, deleteMediaAsset } = useSchoolData();
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Official school logo assets
  const officialLogos = [
    {
      name: 'Official School Emblem (Symbol Only)',
      url: '/logos/school-logo-symbol.jpg',
      type: 'JPG Image',
      scope: 'Favicon, compact header, small-format insignia',
    },
    {
      name: 'Official Full School Logo (Symbol + Wordmark)',
      url: '/logos/school-logo-full.png',
      type: 'PNG Image',
      scope: 'Header, Footer, Official School Profile PDF, Diplomas',
    },
  ];

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-school-navy">
          Media & Asset Library
        </h1>
        <p className="text-xs sm:text-sm text-school-muted mt-1">
          Access official school logos, building photographs, and administrative document assets.
        </p>
      </div>

      {/* Official School Logos Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-8">
        <h2 className="text-base font-bold text-school-navy uppercase tracking-wider mb-2">
          Official School Logos (Master Prompt Assets)
        </h2>
        <p className="text-xs text-school-muted mb-6">
          These official visual brand assets are uploaded and preserved with authentic proportions and color standards (#102D53 Navy and #C9A45C Gold).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {officialLogos.map((logo) => (
            <div key={logo.url} className="bg-school-bg-secondary rounded-xl p-5 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="h-44 bg-white rounded-xl border border-slate-200 flex items-center justify-center p-4 mb-4">
                  <img src={logo.url} alt={logo.name} className="max-h-36 max-w-full object-contain" />
                </div>
                <h3 className="text-sm font-bold text-school-navy mb-1">{logo.name}</h3>
                <p className="text-xs text-slate-500 mb-2">{logo.scope}</p>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                  {logo.type}
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                <code className="text-[11px] text-slate-600 truncate max-w-[200px]">{logo.url}</code>
                <button
                  onClick={() => handleCopy(logo.url)}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-school-navy flex items-center gap-1.5"
                >
                  {copiedUrl === logo.url ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedUrl === logo.url ? 'Copied' : 'Copy Path'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Media Upload Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-base font-bold text-school-navy uppercase tracking-wider mb-1">
            Upload Custom Media Files (JPG / PNG)
          </h2>
          <p className="text-xs text-school-muted">
            Upload campus photos, diplomas, certificates, or publication illustrations.
          </p>
        </div>

        <ImageUpload
          label="New Media Asset"
          value=""
          onChange={(base64) => {
            if (base64) {
              addMediaAsset({
                name: `Uploaded Asset ${new Date().toLocaleTimeString()}`,
                url: base64,
                fileType: base64.startsWith('data:image/png') ? 'PNG Image' : 'JPG Image',
                fileSize: Math.round(base64.length * 0.75),
              });
            }
          }}
          aspectRatio="video"
          helperText="Upload any PNG or JPG image directly to the library."
        />

        {mediaAssets.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Uploaded Files ({mediaAssets.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {mediaAssets.map((asset) => (
                <div key={asset.id} className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 flex flex-col justify-between">
                  <div className="h-32 bg-slate-200 flex items-center justify-center overflow-hidden">
                    <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3">
                    <span className="text-xs font-bold text-school-navy block truncate">{asset.name}</span>
                    <span className="text-[10px] text-slate-400">{asset.fileType}</span>
                    <div className="mt-2 pt-2 border-t border-slate-200 flex items-center justify-between">
                      <button
                        onClick={() => handleCopy(asset.url)}
                        className="text-[11px] font-bold text-school-navy hover:text-school-gold flex items-center gap-1"
                      >
                        {copiedUrl === asset.url ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedUrl === asset.url ? 'Copied' : 'Copy'}</span>
                      </button>
                      <button
                        onClick={() => deleteMediaAsset(asset.id)}
                        className="text-[11px] font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Guidelines */}
      <div className="bg-amber-50/70 rounded-2xl border border-amber-200 p-6 text-xs text-amber-950 space-y-2">
        <div className="font-bold text-amber-900 flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-amber-700" />
          Institutional Asset Guidelines:
        </div>
        <p className="leading-relaxed">
          Per master prompt requirements: The school logos must be used exactly as provided without redrawing, regeneration, or reinterpretation. Use the symbol-only logo for compact navigation and favicon, and use the full logo where adequate space is available.
        </p>
      </div>

    </div>
  );
};
