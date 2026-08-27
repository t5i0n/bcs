import { useState, useEffect, useRef } from 'react';
import { publicContentApi } from '@/lib/api';

interface SiteContentMap {
  [key: string]: string;
}

export function useSiteContent(section?: string) {
  const [content, setContent] = useState<SiteContentMap>({});
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    let cancelled = false;

    void (async () => {
      try {
        const data = await publicContentApi.get();
        if (cancelled || !mountedRef.current) return;

        const map: SiteContentMap = {};
        if (section) {
          // Get content for specific section
          const sectionContent = data.content[section];
          if (sectionContent) {
            for (const [key, value] of Object.entries(sectionContent)) {
              map[key] = value;
            }
          }
        } else {
          // Get all content
          for (const sectionContent of Object.values(data.content)) {
            for (const [key, value] of Object.entries(sectionContent)) {
              map[key] = value;
            }
          }
        }
        setContent(map);
      } catch (err) {
        console.error('Failed to load site content:', err);
      }
    })();

    return () => {
      cancelled = true;
      mountedRef.current = false;
    };
  }, [section]);

  // Helper to get content with fallback to translation key
  const getContent = (cmsKey: string, _fallbackKey: string, fallbackValue?: string): string => {
    if (content[cmsKey]) return content[cmsKey];
    return fallbackValue || '';
  };

  return { content, getContent };
}
