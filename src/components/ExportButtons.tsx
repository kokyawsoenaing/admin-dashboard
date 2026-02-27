import React from "react";
import { FaFileExcel } from "react-icons/fa";
import { FaFileWord } from "react-icons/fa";

interface ExportButtonsProps {
    onExportExcel: () => void;
    onExportWord: () => void;
    disabled: boolean;
}

const ExportButtons: React.FC<ExportButtonsProps> = ({
    onExportExcel,
    onExportWord,
    disabled,
}) => {
    return (
        <div className="flex items-center gap-3">
            {/* Excel Export Button */}
            <button
                onClick={onExportExcel}
                disabled={disabled}
                title="Export to Excel"
                className={`
          flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium
          transition-all duration-200 border
          ${
              disabled
                  ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 active:scale-95"
          }
        `}
            >
                {/* Excel Icon */}
                <FaFileExcel className="w-4 h-4" />
                Export Excel
            </button>

            {/* Word Export Button */}
            <button
                onClick={onExportWord}
                disabled={disabled}
                title="Export to Word"
                className={`
          flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium
          transition-all duration-200 border
          ${
              disabled
                  ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                  : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 hover:border-blue-300 active:scale-95"
          }
        `}
            >
                {/* Word Icon */}
                <FaFileWord className="w-4 h-4" />
                Export Word
            </button>
        </div>
    );
};

export default ExportButtons;
