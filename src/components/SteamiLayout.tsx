import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { StarBackground } from './StarBackground';
import { SteamiNav } from './SteamiNav';
import { ScrollProgress } from './ScrollProgress';
import { Footer } from './Footer';
import { pageVariants } from '@/lib/motion';

export function SteamiLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <ScrollProgress />
      <StarBackground />
      <SteamiNav />
      <motion.main
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="pt-16 px-5 pb-20 max-w-[1200px] mx-auto min-h-[calc(100vh-400px)]"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}
