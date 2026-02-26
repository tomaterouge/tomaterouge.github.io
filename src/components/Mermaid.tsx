import { useEffect, useState, useCallback } from 'react';
import mermaid from 'mermaid';
import clsx from 'clsx';
import { X, ZoomIn } from 'lucide-react';

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
});

interface MermaidProps {
  chart: string;
  /**
   * Optional Tailwind CSS class for height (e.g., 'h-64', 'min-h-96').
   * Will be applied as a min-height to the diagram container.
   */
  height?: string;
}

/**
 * Renders a Mermaid diagram from a string definition with click-to-expand functionality.
 * @param {Object} props - Component props.
 * @param {string} props.chart - The mermaid chart definition.
 * @param {string} [props.height] - Optional Tailwind CSS height class.
 * @returns {JSX.Element} The rendered SVG diagram or a loading/error state.
 */
export function Mermaid({ chart, height }: MermaidProps) {
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    /**
     * Internal async function to handle mermaid rendering.
     */
    const renderChart = async () => {
      try {
        // Generate a unique ID for this diagram instance
        const id = `mermaid-${Math.random().toString(36).substring(2, 11)}`;
        const { svg: renderedSvg } = await mermaid.render(id, chart);
        
        if (isMounted) {
          setSvg(renderedSvg);
          setError(null);
        }
      } catch (err) {
        console.error('Mermaid rendering failed:', err);
        if (isMounted) {
          setError('Failed to render diagram. Please check your mermaid syntax.');
        }
      }
    };

    renderChart();
    
    return () => {
      isMounted = false;
    };
  }, [chart]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsExpanded(false);
    };

    if (isExpanded) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent scrolling when expanded
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isExpanded]);

  const toggleExpand = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  const heightClass = height || 'min-h-40';

  if (error) {
    return (
      <div className={clsx("bg-red-950/20 border border-red-900/30 p-4 rounded-lg my-6 text-red-400 text-sm", heightClass)}>
        <p className="font-semibold mb-2">{error}</p>
        <pre className="mt-2 text-xs opacity-70 overflow-auto bg-black/20 p-2 rounded">{chart}</pre>
      </div>
    );
  }

  if (!svg) {
    return (
      <div className={clsx("animate-pulse bg-zinc-800/50 rounded-lg my-6 border border-zinc-700 flex items-center justify-center", heightClass)}>
        <span className="text-zinc-500 text-sm">Rendering diagram...</span>
      </div>
    );
  }

  return (
    <>
      <div 
        className={clsx(
          "mermaid-diagram group relative my-8 flex justify-center bg-zinc-900/30 p-6 rounded-xl border border-zinc-800/50 overflow-x-auto cursor-zoom-in transition-all hover:bg-zinc-800/40", 
          heightClass
        )}
        onClick={toggleExpand}
        title="Click to expand"
      >
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-800/80 p-1.5 rounded-lg text-zinc-400 hover:text-white">
          <ZoomIn size={18} />
        </div>
        <div 
          className="w-full flex justify-center"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div>

      {/* Expanded Modal */}
      {isExpanded && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/90 backdrop-blur-sm p-4 md:p-10"
          onClick={toggleExpand}
        >
          <button 
            className="absolute top-6 right-6 p-2 cursor-pointer rounded-full bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
          >
            <X size={24} />
          </button>
          
          <div 
            className="w-full max-w-7xl max-h-full overflow-auto bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="mermaid-expanded w-full flex justify-center [&>svg]:w-full [&>svg]:h-[90vh] [&>svg]:max-w-none"
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          </div>
        </div>
      )}
    </>
  );
}
