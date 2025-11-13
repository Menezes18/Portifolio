import React, { useRef } from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export type TimelineItem = {
  year: string;
  title: string;
  description: string;
};

export type TimelineGroup = {
  groupTitle: string;
  items: TimelineItem[];
};

type TimelineProps = {
  groups: TimelineGroup[];
  className?: string;
};

// Framer Motion variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 }
  }
};

const VerticalLine: React.FC<{
  scrollYProgress: any;
}> = ({ scrollYProgress }) => {
  const dashOffset = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <svg
      className="absolute left-1/2 transform -translate-x-1/2 h-full"
      width={2}
      height="100%"
      viewBox="0 0 2 1000"
      preserveAspectRatio="none"
    >
      <motion.line
        x1={1}
        y1={0}
        x2={1}
        y2={1000}
        stroke="#6b7280" // cinza do tailwind
        strokeWidth={2}
        strokeDasharray={1}
        style={{ strokeDashoffset: dashOffset }}
      />
    </svg>
  );
};

const AnimatedTimeline: React.FC<TimelineProps> = ({ groups, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useViewportScroll();

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={cn("relative", className)}
    >
      {/* Linha vertical animada */}
      <VerticalLine scrollYProgress={scrollYProgress} />

      {groups.map((group, groupIndex) => (
        <div key={groupIndex} className="mb-20">
          {/* Título da seção */}
          <motion.h4
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-primary mb-10 text-center"
          >
            {group.groupTitle}
          </motion.h4>

          {group.items.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="timeline-item mb-12"
            >
              {/* Mobile layout */}
              <div className="flex flex-col md:hidden">
                <div className="flex items-center mb-4">
                  <div className="timeline-dot w-4 h-4 rounded-full bg-gray-400 shrink-0" />
                  <span className="ml-4 px-3 py-1 rounded-full text-sm font-semibold bg-gray-200 text-gray-700">
                    {item.year}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>

              {/* Desktop alternating layout */}
              <div className="hidden md:flex items-start relative">
                {index % 2 === 0 ? (
                  <>
                    <div className="w-1/2 pr-8 text-right">
                      <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3 bg-gray-200 text-gray-700">
                        {item.year}
                      </span>
                      <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <div className="absolute left-1/2 -ml-2 mt-1">
                      <div className="timeline-dot w-4 h-4 rounded-full bg-gray-400" />
                    </div>
                    <div className="w-1/2 pl-8" />
                  </>
                ) : (
                  <>
                    <div className="w-1/2 pr-8" />
                    <div className="absolute left-1/2 -ml-2 mt-1">
                      <div className="timeline-dot w-4 h-4 rounded-full bg-gray-400" />
                    </div>
                    <div className="w-1/2 pl-8">
                      <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3 bg-gray-200 text-gray-700">
                        {item.year}
                      </span>
                      <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      ))}
    </motion.div>
  );
};

export default AnimatedTimeline;
