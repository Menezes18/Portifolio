import { motion } from "framer-motion";

export type TimelineItem = {
  year: string;
  title: string;
  description: string;
};

type Props = {
  items: TimelineItem[];
};

export default function ProfessionalTimeline({ items }: Props) {
  return (
    <div className="relative border-l-2 border-primary/30 ml-4 pl-6 space-y-10">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Bolinha na linha do tempo */}
          <div className="absolute -left-[1.625rem] top-1 w-3.5 h-3.5 bg-primary rounded-full border-2 border-background shadow" />

          <div className="bg-background border border-border p-5 rounded-xl shadow-sm hover:shadow-lg transition-all">
            <span className="text-xs font-medium text-primary">{item.year}</span>
            <h3 className="text-lg font-semibold text-foreground mt-1 mb-2">{item.title}</h3>
            <p className="text-sm text-foreground/70">{item.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
