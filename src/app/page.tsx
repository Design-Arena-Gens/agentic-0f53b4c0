'use client';

import { useMemo, useState } from 'react';
import {
  ChatBubbleBottomCenterTextIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import classNames from 'classnames';

type ReviewSource = 'Google' | 'MakeMyTrip' | 'Booking.com' | 'Tripadvisor';
type Sentiment = 'positive' | 'neutral' | 'negative';

type Review = {
  id: string;
  guest: string;
  rating: number;
  title: string;
  snippet: string;
  fullReview: string;
  source: ReviewSource;
  checkIn: string;
  postedAt: string;
  sentiment: Sentiment;
  aiInsights: {
    summary: string;
    highlights: string[];
    actionItems: string[];
  };
};

const REVIEW_SOURCE_STYLES: Record<ReviewSource, { bg: string; text: string; icon: string }> = {
  Google: { bg: 'bg-amber-50', text: 'text-amber-700', icon: '🟢' },
  'MakeMyTrip': { bg: 'bg-red-50', text: 'text-red-600', icon: '🇮🇳' },
  'Booking.com': { bg: 'bg-blue-50', text: 'text-blue-600', icon: '🅱️' },
  Tripadvisor: { bg: 'bg-emerald-50', text: 'text-emerald-600', icon: '🦜' }
};

const SENTIMENT_COLOR: Record<Sentiment, string> = {
  positive: 'bg-positive',
  neutral: 'bg-neutral',
  negative: 'bg-negative'
};

const SENTIMENT_LABEL: Record<Sentiment, string> = {
  positive: 'Positive',
  neutral: 'Mixed',
  negative: 'Negative'
};

const MOCK_REVIEWS: Review[] = [
  {
    id: 'R-1711',
    guest: 'Priya S.',
    rating: 5,
    title: 'Exceptional stay with warm hospitality',
    snippet: 'Loved the rooftop breakfast and staff attention to detail...',
    fullReview:
      'Loved the rooftop breakfast and staff attention to detail. Special thanks to Meera at the front desk who helped with an early check-in after our delayed flight. Rooms were spotless and the spa was a delight. Will recommend to fellow hoteliers!',
    source: 'Google',
    checkIn: '13 Oct 2024',
    postedAt: '2 hours ago',
    sentiment: 'positive',
    aiInsights: {
      summary: 'Guest delighted with hospitality, cleanliness, and wellness services.',
      highlights: ['Personalized front desk assistance', 'High satisfaction with breakfast', 'Positive mention of spa'],
      actionItems: ['Send thank-you note from Meera', 'Promote rooftop breakfast in campaigns']
    }
  },
  {
    id: 'R-1704',
    guest: 'Rahul T.',
    rating: 3,
    title: 'Good rooms, slow service',
    snippet: 'Rooms are spacious but room service took over 40 minutes...',
    fullReview:
      'Rooms are spacious but room service took over 40 minutes for a simple tea order. The restaurant menu could use more local options. Check-out experience was smooth though.',
    source: 'Booking.com',
    checkIn: '05 Oct 2024',
    postedAt: '18 hours ago',
    sentiment: 'neutral',
    aiInsights: {
      summary: 'Room product appreciated but service speed and localisation need work.',
      highlights: ['Large, well-kept rooms', 'Slow room service response'],
      actionItems: ['Audit night shift service SLAs', 'Introduce 2-3 regional breakfast dishes']
    }
  },
  {
    id: 'R-1692',
    guest: 'Sneha & Kartik',
    rating: 4,
    title: 'Memorable anniversary weekend',
    snippet: 'Loved the complimentary décor and view from the 12th floor...',
    fullReview:
      "Loved the complimentary décor and view from the 12th floor suite. Valet was efficient. Only feedback is to improve the poolside music curation in the evenings.",
    source: 'MakeMyTrip',
    checkIn: '28 Sep 2024',
    postedAt: '1 day ago',
    sentiment: 'positive',
    aiInsights: {
      summary: 'Strong experiential feedback with minor ambience suggestion.',
      highlights: ['Complimentary anniversary décor success', 'Valet efficiency called out'],
      actionItems: ['Share appreciation with guest relations team', 'Refresh poolside playlist with live DJ schedule']
    }
  },
  {
    id: 'R-1678',
    guest: 'Akash D.',
    rating: 2,
    title: 'Disappointed with housekeeping',
    snippet: 'Housekeeping skipped our room on Day 2 despite reminders...',
    fullReview:
      'Housekeeping skipped our room on Day 2 despite reminders. We had to call twice for towel replacements. Corridor AC was not functioning either which made the floor feel stuffy.',
    source: 'Tripadvisor',
    checkIn: '17 Sep 2024',
    postedAt: '3 days ago',
    sentiment: 'negative',
    aiInsights: {
      summary: 'Service lapse in housekeeping and HVAC comfort issue.',
      highlights: ['Housekeeping missed scheduled service', 'Multiple escalations for towels'],
      actionItems: ['Log service lapse with duty manager', 'Schedule corridor AC maintenance check']
    }
  }
];

const averageRating = (reviews: Review[]) =>
  reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

const sentimentDistribution = (reviews: Review[]) =>
  reviews.reduce(
    (acc, review) => {
      acc[review.sentiment] += 1;
      return acc;
    },
    { positive: 0, neutral: 0, negative: 0 } as Record<Sentiment, number>
  );

const sentimentOrder: Sentiment[] = ['positive', 'neutral', 'negative'];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 text-amber-500">
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={classNames('text-lg', index + 1 <= rating ? 'opacity-100' : 'opacity-25')}>
          ★
        </span>
      ))}
    </div>
  );
}

function SentimentChip({ sentiment }: { sentiment: Sentiment }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-white/50 px-3 py-1 text-sm font-medium text-slate-600 shadow-sm">
      <span className={classNames('h-2 w-2 rounded-full', SENTIMENT_COLOR[sentiment])} />
      {SENTIMENT_LABEL[sentiment]}
    </div>
  );
}

export default function DashboardPage() {
  const [selectedReview, setSelectedReview] = useState<Review>(MOCK_REVIEWS[0]);

  const average = useMemo(() => averageRating(MOCK_REVIEWS), []);
  const sentimentStats = useMemo(() => sentimentDistribution(MOCK_REVIEWS), []);

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-6 pb-12 pt-12 md:px-10">
      <header className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-brand-600">Ritam Insights Studio</p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Ritam Reviews Dashboard
          </h1>
          <p className="mt-2 max-w-xl text-sm text-slate-600">
            Unite every guest voice from Google, MakeMyTrip, Booking.com & Tripadvisor into a single, actionable control
            room crafted for India&apos;s hospitality leaders.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-soft">
            <ChatBubbleBottomCenterTextIcon className="h-4 w-4 text-brand-500" />
            128 new reviews this month
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-soft">
            <SparklesIcon className="h-4 w-4 text-amber-500" />
            12 AI nudges awaiting action
          </div>
        </div>
      </header>

      <section className="grid gap-6 rounded-3xl bg-white/70 p-6 shadow-soft backdrop-blur md:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col gap-6 border-r border-slate-100 pr-4 md:pr-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 rounded-2xl bg-slate-50/80 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Portfolio Pulse</p>
                  <div className="mt-2 flex items-center gap-3">
                    <p className="font-display text-3xl font-semibold text-slate-900">{average.toFixed(1)}</p>
                    <Stars rating={Math.round(average)} />
                  </div>
                </div>
                <SentimentChip sentiment={selectedReview.sentiment} />
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm text-slate-600">
                {sentimentOrder.map((sentiment) => (
                  <div key={sentiment} className="rounded-xl bg-white/80 p-3 text-center shadow-sm">
                    <p className="text-xs uppercase tracking-wide text-slate-400">{SENTIMENT_LABEL[sentiment]}</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">{sentimentStats[sentiment]}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                placeholder="Search by guest, room type, or keyword"
                className="w-full rounded-full border border-slate-100 bg-white py-3 pl-12 pr-5 text-sm text-slate-600 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
              />
              <button className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2 rounded-full bg-brand-500 px-3 py-1.5 text-xs font-medium text-white shadow-lg shadow-brand-500/40 transition hover:bg-brand-600">
                <FunnelIcon className="h-4 w-4" />
                Filters
              </button>
            </div>
          </div>

          <div className="scrollbar-thin flex-1 space-y-3 overflow-y-auto pb-6">
            {MOCK_REVIEWS.map((review) => {
              const sourceStyle = REVIEW_SOURCE_STYLES[review.source];
              const isActive = review.id === selectedReview.id;

              return (
                <button
                  key={review.id}
                  type="button"
                  onClick={() => setSelectedReview(review)}
                  className={classNames(
                    'w-full rounded-2xl border border-transparent bg-white/90 p-4 text-left transition shadow-sm',
                    'hover:-translate-y-1 hover:border-brand-100 hover:shadow-lg',
                    isActive && 'border-brand-200 bg-brand-50/70 shadow-lg shadow-brand-100/60'
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-3">
                        <div
                          className={classNames(
                            'flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold',
                            sourceStyle.bg,
                            sourceStyle.text
                          )}
                        >
                          <span>{sourceStyle.icon}</span>
                          {review.source}
                        </div>
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-300">{review.id}</p>
                      </div>
                      <p className="mt-3 font-display text-lg text-slate-900">{review.title}</p>
                      <p className="mt-1 text-sm text-slate-500 line-clamp-2">{review.snippet}</p>
                      <div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
                        <span>{review.guest}</span>
                        <span className="h-1 w-1 rounded-full bg-slate-300" />
                        <span>{review.postedAt}</span>
                        <span className="h-1 w-1 rounded-full bg-slate-300" />
                        <span>Stayed {review.checkIn}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Stars rating={review.rating} />
                      <span className={classNames('h-2.5 w-2.5 rounded-full', SENTIMENT_COLOR[review.sentiment])} />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-5 pl-4 md:pl-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="font-display text-2xl font-semibold text-slate-900">{selectedReview.title}</h2>
                <Stars rating={selectedReview.rating} />
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <span className="font-medium text-slate-700">{selectedReview.guest}</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>{selectedReview.postedAt}</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>Check-in: {selectedReview.checkIn}</span>
              </div>
            </div>
            <SentimentChip sentiment={selectedReview.sentiment} />
          </div>

          <article className="rounded-3xl bg-gradient-to-br from-white via-slate-50 to-white p-6 text-base leading-relaxed text-slate-700 shadow-inner">
            {selectedReview.fullReview}
          </article>

          <div className="grid gap-5 rounded-3xl bg-white/90 p-6 shadow-soft">
            <div className="flex items-center gap-3">
              <SparklesIcon className="h-6 w-6 text-brand-500" />
              <div>
                <h3 className="font-display text-lg font-semibold text-slate-900">AI Sentiment Analysis</h3>
                <p className="text-sm text-slate-500">Powered by Ritam&apos;s hospitality intelligence engine</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-600">
              <section>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Summary Pulse</p>
                <p className="mt-2 rounded-2xl bg-slate-50/80 p-4 text-slate-700">
                  {selectedReview.aiInsights.summary}
                </p>
              </section>

              <section className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-brand-50 to-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">Highlights for Leadership</p>
                  <ul className="mt-3 space-y-2">
                    {selectedReview.aiInsights.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-400" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-amber-50 to-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">Action Items for Teams</p>
                  <ul className="mt-3 space-y-2">
                    {selectedReview.aiInsights.actionItems.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>
          </div>

          <footer className="mt-auto flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <div>
              <p>Data refreshed 8 minutes ago · Next sync at 18:00 IST</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-500">Escalate to:</span>
              <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1 font-medium text-slate-500 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Duty Manager · South Wing
              </div>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}
