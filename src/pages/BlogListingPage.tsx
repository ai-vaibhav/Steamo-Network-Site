import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SteamiLayout } from '@/components/SteamiLayout';
import { useBlogStore } from '@/stores/blog-store';
import { useThemeStore } from '@/stores/theme-store';
import { CardSvgVisual } from '@/components/CardSvgVisual';
import { fadeInUp } from '@/lib/motion';
import { AnimatedSection, AnimatedCard } from '@/components/MotionWrappers';

export default function BlogListingPage() {
  const { posts } = useBlogStore();
  const isLight = useThemeStore((s) => s.theme === 'light');

  return (
    <SteamiLayout>
      <motion.div className="mb-10" variants={fadeInUp} initial="hidden" animate="visible">
        <h1 className="steami-heading text-2xl sm:text-3xl md:text-4xl mb-4">Blog</h1>
        <p className="text-[15px] font-medium text-muted-foreground max-w-2xl leading-relaxed">
          The latest insights, discoveries, and thought pieces from the community.
        </p>
      </motion.div>

      <AnimatedSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, idx) => (
          <AnimatedCard key={post.id} index={idx} className="h-full">
            <Link to={`/blog/${post.id}`} className="glass-card flex flex-col h-full overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: isLight
                      ? 'linear-gradient(180deg, transparent 40%, rgba(255,255,255,0.95) 100%)'
                      : 'linear-gradient(180deg, transparent 40%, rgba(2,8,23,0.95) 100%)',
                  }}
                />
                <CardSvgVisual field={post.field} variant="mini" className="absolute bottom-2 right-2 opacity-50" />
                <span className={`steami-badge steami-badge-${post.badgeColor} absolute top-4 left-4 text-[10px]`}>
                  {post.field}
                </span>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h2 className="font-serif text-[17px] font-bold text-foreground mb-2 leading-snug line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-[14px] font-medium text-muted-foreground leading-relaxed line-clamp-3 flex-1 mb-4">
                  {post.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-foreground/5 mt-auto">
                  <div className="flex items-center gap-2">
                    <img src={post.author.avatar} alt={post.author.name} className="w-6 h-6 rounded-full" />
                    <span className="font-mono text-[11px] text-muted-foreground">{post.author.name}</span>
                  </div>
                  <span className="font-mono text-[11px] text-muted-foreground">{post.publishDate}</span>
                </div>
              </div>
            </Link>
          </AnimatedCard>
        ))}
      </AnimatedSection>

      {posts.length === 0 && (
        <div className="text-center py-20">
          <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">No posts found</p>
        </div>
      )}
    </SteamiLayout>
  );
}
