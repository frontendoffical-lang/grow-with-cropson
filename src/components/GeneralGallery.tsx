import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, Image as ImageIcon, X } from 'lucide-react';



const GeneralGallery = () => {
  const { t } = useTranslation();
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'image' | 'video' | null>(null);

  // Sample gallery data - can be moved to Redux store later
  const galleryItems = [
    {
      id: 1,
      type: "image" as const,
      src: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      type: "video" as const,
      src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80", // thumbnail
      videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4", // sample video
    },
    {
      id: 3,
      type: "image" as const,
      src: "https://images.unsplash.com/photo-1567016526105-22da7c13161a?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      type: "image" as const,
      src: "https://images.unsplash.com/photo-1668906093328-99601a1aa584?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 5,
      type: "video" as const,
      src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80", // thumbnail
      videoSrc: "https://www.w3schools.com/html/movie.mp4",
    },
    {
      id: 6,
      type: "image" as const,
      src: "https://images.unsplash.com/photo-1586232702178-f044c5f4d4b7?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 7,
      type: "image" as const,
      src: "https://images.unsplash.com/photo-1542125387-c71274d94f0a?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 8,
      type: "video" as const,
      src: "https://images.unsplash.com/photo-1668869713519-9bcbb0da7171?auto=format&fit=crop&w=600&q=80", // thumbnail
      videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
  ];

  const openLightbox = (src: string, type: 'image' | 'video') => {
    setSelectedMedia(src);
    setSelectedType(type);
  };

  const closeLightbox = () => {
    setSelectedMedia(null);
    setSelectedType(null);
  };

  return (
    <>
      <section className="py-10 bg-gradient-to-b from-background to-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              {t('gallery.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('gallery.subtitle')}
            </p>
          </div>

          <div className="max-w-[85rem] px-4 py-5 sm:px-6 lg:px-8 lg:py-8 mx-auto">
            {/* Masonry style with columns */}
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
              {galleryItems.map((item) => (
                < div
                  key={item.id}
                  className="relative group cursor-pointer overflow-hidden break-inside-avoid rounded-xl"
                  onClick={() => openLightbox(item.videoSrc || item.src, item.type)}
                >
                  <img
                    src={item.src}
                    alt={`Gallery item ${item.id}`}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                  {/* Play Button for Videos */}
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-colors duration-300 shadow-lg">
                        <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section >

      {/* Lightbox */}
      {
        selectedMedia && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full">
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>

              {selectedType === 'video' ? (
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  <video
                    src={selectedMedia}
                    controls
                    autoPlay
                    className="w-full h-full"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <div className="bg-black rounded-lg overflow-hidden">
                  <img
                    src={selectedMedia}
                    alt={t('gallery.altText')}
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                </div>
              )}
            </div>
          </div>
        )
      }
    </>
  );
};

export default GeneralGallery;