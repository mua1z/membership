import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  ArrowRight, UserPlus, Check, Users,
  Wallet, TrendingUp, Megaphone, ShieldCheck, Zap, FileSpreadsheet,
  Receipt, ChevronRight, Star, Quote, Network, Landmark
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import api from '../lib/api'
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import Statistics from '../components/landing/Statistics';
import About from '../components/landing/About';
import Features from '../components/landing/Features';
import SmartAdmin from '../components/landing/SmartAdmin';
import Trust from '../components/landing/Trust';
import Leadership from '../components/landing/Leadership';
import Gallery from '../components/landing/Gallery';
import News from '../components/landing/News';
import Security from '../components/landing/Security';
import Contact from '../components/landing/Contact';
import CTA from '../components/landing/CTA';
import Footer from '../components/landing/Footer';
import ScrollToTop from '../components/landing/ScrollToTop';
import PageLoader from '../components/PageLoader';

export default function Landing() {
  const { t } = useTranslation();

  return (
    <div className="overflow-x-hidden bg-slate-50 dark:bg-ebony transition-colors duration-500">

      {/* ── 1. HERO SECTION ────────────────────────── */}
      <section className="relative py-32 flex items-center justify-center overflow-hidden border-b border-slate-200 dark:border-white/5" style={{ perspective: 1000 }}>
        {/* Background Image with Parallax effect */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <img
            src="/luxury-hero.png"
            alt="Hero Background"
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-white/20 dark:bg-ebony/40"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50 dark:from-transparent dark:via-transparent dark:to-ebony"></div>
        </motion.div>

        <div className="max-w-5xl mx-auto px-8 w-full relative z-10 flex flex-col items-center text-center pt-20">
          <div className="space-y-10 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 100, rotateX: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
              className="flex flex-col items-center w-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.h1
                className="text-5xl lg:text-[80px] font-black text-slate-900 dark:text-white leading-[1.1] tracking-tighter mb-10 drop-shadow-[0_10px_30px_rgba(255,255,255,0.8)] dark:drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]"
                style={{ transform: "translateZ(50px)" }}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.15, delayChildren: 0.5 }
                  }
                }}
              >
                <motion.span
                  className="text-black dark:text-gold drop-shadow-lg block mb-2"
                  variants={{ hidden: { opacity: 0, y: 50, rotateX: 90 }, visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", bounce: 0.6 } } }}
                >
                  {t('common.hero_title_line1')}
                </motion.span>
                <motion.span
                  className="block"
                  variants={{ hidden: { opacity: 0, y: 50, rotateX: -90 }, visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", bounce: 0.6 } } }}
                >
                  {t('common.hero_title_line2')}
                </motion.span>
              </motion.h1>

              <p className="text-xl text-slate-900 dark:text-slate-100 max-w-2xl leading-relaxed font-bold mb-12 drop-shadow-[0_2px_5px_rgba(255,255,255,0.8)] dark:drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)] mx-auto">
                {t('common.hero_desc_landing')}
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center" style={{ transform: "translateZ(30px)" }}>
                <motion.button
                  whileHover={{ scale: 1.05, rotateY: -10, z: 20 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/login')}
                  className="flex items-center justify-center gap-4 bg-primary dark:bg-gold text-white dark:text-ebony px-10 py-5 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-[0_10px_40px_rgba(37,99,235,0.3)] dark:shadow-[0_0_50px_rgba(212,175,55,0.4)] transition-all duration-300 group"
                >
                  {t('common.hero_btn_register')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, rotateY: 10, z: 20 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/login')}
                  className="flex items-center justify-center gap-4 bg-white/90 dark:bg-white/10 backdrop-blur-md border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white px-10 py-5 rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-white dark:hover:bg-white/20 shadow-xl dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300"
                >
                  {t('common.hero_btn_login')}
                </motion.button>
              </div>
            </motion.div>

            {/* Floating Stats */}
            <div className="grid grid-cols-3 gap-8 md:gap-16 pt-12 border-t border-slate-200 dark:border-white/10 w-full max-w-3xl mx-auto">
              {[
                { label: t('common.hero_stat_members'), value: '45,000+' },
                { label: t('common.hero_stat_contributions'), value: '$2.4M' },
                { label: t('common.hero_stat_sectors'), value: '120+' }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <p className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-2">{stat.value}</p>
                  <p className="text-[9px] text-primary dark:text-gold font-bold uppercase tracking-widest">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-50"
        >
          <span className="text-[9px] text-slate-500 dark:text-white font-black uppercase tracking-[0.4em]">{t('common.hero_scroll')}</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-slate-400 dark:from-white to-transparent"></div>
        </motion.div>
      </section>

      {/* ── 2. ABOUT SECTION ────────────────────────── */}
      <section id="about" className="py-40 bg-white dark:bg-ebony relative overflow-hidden transition-colors duration-500">
        <div className="max-w-[1400px] mx-auto px-8 grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-6 bg-primary/10 rounded-[3rem] rotate-3 translate-x-4"></div>
            <img
              src="/luxury-about.png"
              alt="Leadership"
              className="relative z-10 w-full rounded-[2.5rem] shadow-2xl hover:scale-[1.02] transition-transform duration-700"
            />
            <div className="absolute -bottom-10 -right-10 bg-primary dark:bg-gold p-12 rounded-[2.5rem] shadow-2xl z-20 hidden md:block">
              <p className="text-white dark:text-ebony text-4xl font-black mb-2 tracking-tighter">15+</p>
              <p className="text-white/80 dark:text-ebony/60 text-[10px] font-black uppercase tracking-widest">{t('common.about_years')}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-sm font-black text-primary dark:text-gold uppercase tracking-[0.5em]">{t('common.about_label')}</h2>
            <h3 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight">
              {t('common.about_title')}
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              {t('common.about_desc')}
            </p>

            <ul className="space-y-6 pt-4">
              {[
                t('common.about_item_1'),
                t('common.about_item_2'),
                t('common.about_item_3'),
                t('common.about_item_4')
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 group">
                  <div className="w-6 h-6 rounded-full bg-primary/10 dark:bg-gold/10 flex items-center justify-center group-hover:bg-primary dark:group-hover:bg-gold transition-colors">
                    <Check size={14} className="text-primary dark:text-gold group-hover:text-white dark:group-hover:text-ebony" />
                  </div>
                  <span className="text-slate-900 dark:text-white font-bold tracking-tight">{item}</span>
                </li>
              ))}
            </ul>

            <button className="flex items-center gap-3 text-primary dark:text-gold font-black uppercase tracking-widest text-xs mt-10 hover:gap-5 transition-all">
              {t('common.about_cta')} <ChevronRight size={18} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── 3. FEATURES SECTION ─────────────────────── */}
      <section id="features" className="py-40 bg-slate-50 dark:bg-[#05070a] transition-colors duration-500">
        <div className="max-w-[1400px] mx-auto px-8">
          <SectionHeader
            subtitle={t('common.features_subtitle')}
            title={t('common.features_title')}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard icon={UserPlus} title={t('common.feat_reg_title')} desc={t('common.feat_reg_desc')} delay={0.1} />
            <FeatureCard icon={Wallet} title={t('common.feat_pay_title')} desc={t('common.feat_pay_desc')} delay={0.2} />
            <FeatureCard icon={TrendingUp} title={t('common.feat_analytics_title')} desc={t('common.feat_analytics_desc')} delay={0.3} />
            <FeatureCard icon={FileSpreadsheet} title={t('common.feat_export_title')} desc={t('common.feat_export_desc')} delay={0.4} />
            <FeatureCard icon={Megaphone} title={t('common.feat_announce_title')} desc={t('common.feat_announce_desc')} delay={0.5} />
            <FeatureCard icon={ShieldCheck} title={t('common.feat_admin_title')} desc={t('common.feat_admin_desc')} delay={0.6} />
            <FeatureCard icon={Network} title={t('common.feat_sector_title')} desc={t('common.feat_sector_desc')} delay={0.7} />
            <FeatureCard icon={Receipt} title={t('common.feat_receipt_title')} desc={t('common.feat_receipt_desc')} delay={0.8} />
          </div>
        </div>
      </section>

      {/* ── 4. HOW IT WORKS ─────────────────────────── */}
      <section className="py-40 bg-white dark:bg-ebony transition-colors duration-500 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 dark:bg-gold/5 -skew-x-12 translate-x-32"></div>
        </div>

        <div className="max-w-[1400px] mx-auto px-8 relative z-10">
          <SectionHeader subtitle={t('common.how_subtitle')} title={t('common.how_title')} />

          <div className="grid md:grid-cols-5 gap-12 relative">
            {/* Connector Line */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 dark:via-gold/20 to-transparent hidden md:block"></div>

            {[
              { step: '01', title: t('common.how_step1_title'), desc: t('common.how_step1_desc') },
              { step: '02', title: t('common.how_step2_title'), desc: t('common.how_step2_desc') },
              { step: '03', title: t('common.how_step3_title'), desc: t('common.how_step3_desc') },
              { step: '04', title: t('common.how_step4_title'), desc: t('common.how_step4_desc') },
              { step: '05', title: t('common.how_step5_title'), desc: t('common.how_step5_desc') }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center relative z-10 group"
              >
                <div className="w-20 h-20 rounded-full bg-white dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 flex items-center justify-center mx-auto mb-8 group-hover:bg-primary dark:group-hover:bg-gold group-hover:border-primary dark:group-hover:border-gold group-hover:text-white dark:group-hover:text-ebony transition-all duration-500 shadow-lg dark:shadow-sm">
                  <span className="text-2xl font-black text-slate-800 dark:text-white group-hover:text-white dark:group-hover:text-ebony">{item.step}</span>
                </div>
                <h4 className="text-xl font-black text-primary dark:text-gold mb-3 tracking-tight">{item.title}</h4>
                <p className="text-slate-500 dark:text-white/70 text-sm font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FEATURES */}
      <Features />

      {/* 6. SMART ADMINISTRATION */}
      <SmartAdmin />

      {/* 7. WHY TRUST THIS PLATFORM */}
      <Trust />

      {/* 8. LEADERSHIP MESSAGE */}
      <Leadership content={content} leaderImg={leaderImg} />

      {/* 9. EVENTS & GALLERY */}
      <Gallery galleryImages={galleryImages} />

      {/* 10. NEWS & ANNOUNCEMENTS */}
      <News galleryImages={galleryImages} />

      {/* 11. SECURITY & TRANSPARENCY */}
      <Security />

      {/* ── 8. GALLERY / COMMUNITY ─────────────────── */}
      <section className="py-40 bg-white dark:bg-ebony transition-colors duration-500">
        <div className="max-w-[1400px] mx-auto px-8">
          <SectionHeader subtitle={t('common.community_subtitle')} title={t('common.community_title')} />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-[600px]">
            <motion.div
              whileHover={{ scale: 0.98 }}
              className="md:col-span-8 relative overflow-hidden rounded-[3rem] group"
            >
              <img src="/luxury-community.png" alt="Community" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-ebony/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-12 left-12">
                <h4 className="text-3xl font-black text-white tracking-tighter">{t('common.community_event')}</h4>
                <p className="text-amber-400 dark:text-gold font-bold tracking-widest uppercase text-xs mt-2">{t('common.community_venue')}</p>
              </div>
            </motion.div>
            <div className="md:col-span-4 grid grid-rows-2 gap-8">
              <motion.div whileHover={{ scale: 0.98 }} className="relative overflow-hidden rounded-[3rem] group">
                <img src="/luxury-hero.png" alt="Office" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-ebony/40 group-hover:bg-transparent transition-all"></div>
              </motion.div>
              <motion.div whileHover={{ scale: 0.98 }} className="relative overflow-hidden rounded-[3rem] group">
                <img src="/luxury-about.png" alt="Workshop" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-ebony/40 group-hover:bg-transparent transition-all"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. CALL TO ACTION ───────────────────────── */}
      <section className="py-40 relative bg-slate-50 dark:bg-ebony transition-colors duration-500">
        <div className="max-w-[1400px] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-ebony-card p-20 md:p-32 rounded-[4rem] relative overflow-hidden border border-slate-200 dark:border-white/5 shadow-2xl"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 dark:bg-gold/10 blur-[100px] rounded-full"></div>
            </div>

            <div className="relative z-10 text-center space-y-12">
              <h3 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
                {t('common.cta_title_line1')} <br /> {t('common.cta_title_line2')}
              </h3>
              <p className="text-xl text-slate-600 dark:text-white/70 max-w-2xl mx-auto font-medium">
                {t('common.cta_desc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-8 justify-center">
                <button
                  onClick={() => navigate('/login')}
                  className="px-12 py-6 bg-primary text-white font-black uppercase tracking-[0.2em] rounded-full hover:scale-105 hover:bg-ebony transition-all shadow-xl"
                >
                  {t('common.cta_btn_member')}
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="px-12 py-6 bg-transparent border-2 border-primary text-primary dark:text-white font-black uppercase tracking-[0.2em] rounded-full hover:bg-primary hover:text-white transition-all"
                >
                  {t('common.cta_btn_dashboard')}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
