import React, { useState } from 'react';
import { X, Copy, Check, QrCode, ExternalLink, Smartphone, School } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareUrl: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  shareUrl
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-stone-200 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-8 h-8 rounded-lg bg-amber-800 text-white flex items-center justify-center">
            <School className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-amber-800 font-semibold block">
              Unterrichts-Freigabe
            </span>
            <h3 className="text-xl font-bold text-stone-900">
              Link für Schülerinnen & Schüler
            </h3>
          </div>
        </div>

        <p className="text-xs text-stone-600 font-serif-literary leading-relaxed mb-6">
          Teile diesen Link mit deiner Klasse. Die Lernumgebung läuft direkt im Browser – 
          ohne Registrierung, ohne Installation und auf jedem Smartphone, Tablet oder Laptop.
        </p>

        {/* URL Box with Copy Button */}
        <div className="mb-6">
          <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-2">
            Direkter Zugangslink:
          </label>
          <div className="flex items-center gap-2 p-1.5 bg-stone-50 border border-stone-200 rounded-xl">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-transparent px-3 py-2 text-xs font-mono text-stone-800 focus:outline-none select-all"
            />
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer shrink-0 ${
                copied
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-stone-900 hover:bg-stone-800 text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Kopiert!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Kopieren</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* QR Code Presentation Box (Perfect for Beamer / Smartboard) */}
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 flex flex-col items-center text-center mb-6">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 uppercase tracking-wider mb-3">
            <QrCode className="w-4 h-4 text-amber-800" />
            <span>QR-Code für Beamer & digitale Tafel</span>
          </div>
          
          <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-xs mb-3">
            <img
              src={qrCodeUrl}
              alt="QR-Code zum Scannen für Schüler"
              className="w-48 h-48 sm:w-52 sm:h-52 object-contain"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-stone-500 font-serif-literary">
            <Smartphone className="w-3.5 h-3.5 text-stone-400" />
            <span>Schüler können den Code einfach mit der Handykamera oder dem iPad scannen.</span>
          </div>
        </div>

        {/* Footer info & Test link */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-200 text-xs">
          <a
            href={shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-amber-800 hover:text-amber-950 font-semibold"
          >
            <span>In neuem Tab öffnen</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
          >
            Fertig
          </button>
        </div>

      </div>
    </div>
  );
};
