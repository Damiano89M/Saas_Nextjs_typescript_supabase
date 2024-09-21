'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Database } from "@/types/database.types";

interface CoursesListProps {
  lessons: Database["public"]["Tables"]["lessons"]["Row"][];
}

const getEmbedUrl = (url: string | null) => {
  if (!url) return ''; // Se l'URL è nullo o vuoto, restituisci una stringa vuota

  // Usa una regex per estrarre l'ID del video dall'URL di YouTube
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);

  // Se la regex trova una corrispondenza, costruisci l'URL di embed e restituiscilo
  // Altrimenti, restituisci una stringa vuota
  return match ? `https://www.youtube.com/embed/${match[1]}` : '';
};

const CoursesList = ({ lessons }: CoursesListProps) => {

  return (
    <Accordion type="single" collapsible>
      {lessons.map((lesson, index) => (
        <AccordionItem key={lesson.id} value={`item-${index}`}>
          <AccordionTrigger>{lesson.title}</AccordionTrigger>
          <AccordionContent>
            {lesson.video_id ? (
              <iframe
                width="560"
                height="315"
                src={getEmbedUrl(lesson.video_id)}
                frameBorder="0"
                allowFullScreen
                onError={(e) => {
                  console.error('Errore di embedding video:', e);
                  alert('Impossibile caricare il video. Controlla il link o riprova più tardi.');
                }}
              />
            ) : (
              <span>nessun video</span>
            )}
            <AccordionContent>{lesson.description}</AccordionContent>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default CoursesList;
