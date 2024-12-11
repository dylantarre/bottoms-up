import React from 'react';
import { Beer, ArrowRight } from 'lucide-react';

interface ActionButtonsProps {
  onLoadMore: () => void;
  onContinue: () => void;
  showLoadMore: boolean;
  hasSelection: boolean;
}

export function ActionButtons({ onLoadMore, onContinue, hasSelection, showLoadMore }: ActionButtonsProps) {
  return (
    <div className="flex justify-center gap-4 mt-8">
      {showLoadMore && (
        <button
          onClick={onLoadMore}
          className="px-6 py-2 text-amber-700 bg-white border border-amber-200 rounded-lg hover:bg-amber-50 transition-colors"
        >
          Load Next Round 🍺
        </button>
      )}
      
      {hasSelection && (
        <button
          onClick={onContinue}
          className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors inline-flex items-center gap-2"
        >
          Prepare Shots <Beer className="w-4 h-4" />
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}