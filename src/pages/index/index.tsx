import { useMemo, useState } from 'react';
import { Image, ScrollView, Text, View } from '@tarojs/components';
import {
  ARTICLES,
  DEMO_USER_STATS,
  LEXILE_HISTORY,
  MOCK_QUIZ,
  RECENT_ACTIVITY,
  WEEKLY_PROGRESS,
} from './data';
import { Article, Screen } from './types';
import './index.scss';

interface LandingScreenProps {
  onGetStarted: () => void;
}

const LandingScreen = ({ onGetStarted }: LandingScreenProps) => (
  <ScrollView scrollY enableFlex className="screen landing">
    <View className="landing__content">
      <View className="landing__icon">📰</View>
      <Text className="landing__title">Stay Informed, Get Smarter.</Text>
      <Text className="landing__subtitle">
        Your daily dose of news, designed to boost your reading skills.
      </Text>
      <View className="landing__hero">
        <Image
          mode="aspectFill"
          className="hero-image"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_cs5TjlaT4pfKDh_ZooXnhYOYGI8zwkUHOc7ukiCoFIWTjyBJmgX11WwdjakJepV2QcUbLkJRj4Qp2_XTdZIeuwu42PC6-HeFkL7FqAHXnt3_PTjwKtpNxHBpSY0BpKQP6dnCF7UqQvC46hr2iisz2rIMZ2uH30JQxk29oAceW52BEtTze07iI1NWGD_GHVBfJHWqx2e16igAaJVV-QyyBrldyL9p6aBaOTHUClw55X-Tna79DECzAanORzW_6VJjY5_FQykkOuE"
        />
      </View>
    </View>
    <View className="cta">
      <View className="btn btn-primary" onClick={onGetStarted}>
        <Text>Get Started</Text>
      </View>
      <Text className="cta__hint">
        Already have an account? <Text className="cta__link">Log In</Text>
      </Text>
    </View>
  </ScrollView>
);

interface FeedScreenProps {
  onArticleClick: (id: string) => void;
  onProfileClick: () => void;
}

const NewsFeedScreen = ({ onArticleClick, onProfileClick }: FeedScreenProps) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Science', 'Technology', 'World', 'Arts', 'History'];
  const filteredArticles = useMemo(
    () =>
      activeCategory === 'All'
        ? ARTICLES
        : ARTICLES.filter(article => article.category === activeCategory),
    [activeCategory],
  );

  return (
    <ScrollView scrollY enableFlex className="screen feed">
      <View className="app-bar">
        <Text className="app-bar__icon">☰</Text>
        <Text className="app-bar__title">Latest News</Text>
        <View className="app-bar__avatar" onClick={onProfileClick}>
          <Text>AJ</Text>
        </View>
      </View>

      <ScrollView scrollX className="category-bar">
        {categories.map(cat => (
          <View
            key={cat}
            className={`pill ${cat === activeCategory ? 'pill--active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            <Text>{cat}</Text>
          </View>
        ))}
      </ScrollView>

      <View className="feed-list">
        {filteredArticles.map(article => (
          <View
            key={article.id}
            className="article-card"
            onClick={() => onArticleClick(article.id)}
          >
            <Image mode="aspectFill" className="article-card__image" src={article.imageUrl} />
            <View className="article-card__body">
              <Text className="article-card__title">{article.title}</Text>
              <Text className="article-card__meta">
                {article.source} • {article.timeAgo}
              </Text>
              {article.progress > 0 && (
                <View className="progress">
                  <View className="progress__track">
                    <View
                      className="progress__bar"
                      style={{ width: `${article.progress}%` }}
                    ></View>
                  </View>
                  <Text className="progress__icon">🎯</Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>

      <View className="fab">
        <View className="fab__button">
          <Text>🏆</Text>
        </View>
      </View>
    </ScrollView>
  );
};

interface ArticleScreenProps {
  article: Article;
  onBack: () => void;
  onStartQuiz: () => void;
}

const ArticleScreen = ({ article, onBack, onStartQuiz }: ArticleScreenProps) => (
  <ScrollView scrollY enableFlex className="screen article">
    <View className="article__top">
      <View className="icon-btn" onClick={onBack}>
        <Text>←</Text>
      </View>
      <View className="article__actions">
        <View className="icon-btn">
          <Text>↗</Text>
        </View>
        <View className="icon-btn">
          <Text>★</Text>
        </View>
      </View>
    </View>
    <View className="progress-bar">
      <View className="progress-bar__fill" style={{ width: '75%' }}></View>
    </View>

    <View className="article__body">
      <Text className="article__title">{article.title}</Text>
      <Text className="article__byline">
        By {article.source} •{' '}
        {article.timeAgo === 'Oct 26, 2023' ? 'October 26, 2023' : 'Today'}
      </Text>
      <Image mode="aspectFill" className="article__hero" src={article.imageUrl} />
      <View className="article__content">
        {article.content.map((paragraph, idx) => (
          <View key={idx}>
            <Text className="article__paragraph">{paragraph}</Text>
            {article.id === '2' && idx === 0 && (
              <Text className="article__subhead">A World of Extremes</Text>
            )}
            {article.id === '2' && idx === 2 && (
              <Image
                mode="aspectFill"
                className="article__inline-image"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRVjMQaSMS161mzq7YuXBXtwGdXeA1M2slwkaLvCWfbgI_mzKvLH_cPDypNPYK56OUWfIKvwZa9ZG2UEV9RHvmyGSSZNF5n9bTmpEbBiZyPRuVb68CfR94O_gxG9RO6wsbf1Ge0AAZ0HOuTIvfvUIf8nf-TtRWLOunv2jptfjEMobfSaS8AV2ltlWqKDo50CHzCZDdjQ6U92-IGnpFDKj8xCWV1DYlv0t77EbnbrTu3ym3E0rc7qgjMfI3D3n3VFMjKA3RHUbxgeo"
              />
            )}
          </View>
        ))}
      </View>
    </View>

    <View className="footer-cta">
      <View className="btn btn-primary" onClick={onStartQuiz}>
        <Text>Start Questions</Text>
      </View>
    </View>
  </ScrollView>
);

interface QuizScreenProps {
  onClose: () => void;
  onSubmit: (optionId: string) => void;
}

const QuizScreen = ({ onClose, onSubmit }: QuizScreenProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const handleSubmit = () => {
    if (selected) {
      onSubmit(selected);
    }
  };

  return (
    <ScrollView scrollY enableFlex className="screen quiz">
      <View className="quiz__top">
        <View className="icon-btn" onClick={onClose}>
          <Text>×</Text>
        </View>
        <View className="quiz__title">
          <Text className="quiz__label">Comprehension</Text>
          <Text className="quiz__progress-label">3/10 Questions</Text>
        </View>
        <View className="quiz__spacer" />
      </View>

      <View className="progress-bar progress-bar--thick">
        <View className="progress-bar__fill" style={{ width: '30%' }}></View>
      </View>

      <View className="quiz__question">
        <Text>{MOCK_QUIZ.text}</Text>
      </View>

      <View className="quiz__options">
        {MOCK_QUIZ.options.map(option => {
          const isSelected = selected === option.id;
          return (
            <View
              key={option.id}
              className={`option ${isSelected ? 'option--selected' : ''}`}
              onClick={() => setSelected(option.id)}
            >
              <View className={`option__marker ${isSelected ? 'option__marker--on' : ''}`}>
                {isSelected && <Text>✓</Text>}
              </View>
              <Text className="option__text">{option.text}</Text>
            </View>
          );
        })}
      </View>

      <View className="footer-cta">
        <View
          className={`btn ${selected ? 'btn-primary' : 'btn-disabled'}`}
          onClick={handleSubmit}
        >
          <Text>Submit Answer</Text>
        </View>
      </View>
    </ScrollView>
  );
};

interface FeedbackScreenProps {
  isCorrect: boolean;
  correctOptionText: string;
  explanation: string;
  onNext: () => void;
}

const MCFeedbackScreen = ({
  isCorrect,
  correctOptionText,
  explanation,
  onNext,
}: FeedbackScreenProps) => {
  const [showExplanation, setShowExplanation] = useState(!isCorrect);

  return (
    <ScrollView scrollY enableFlex className="screen feedback">
      <View className="section">
        <View className="section__header">
          <Text className="section__label">Progress</Text>
          <Text className="section__label">3/5</Text>
        </View>
        <View className="progress-bar progress-bar--thin">
          <View className="progress-bar__fill" style={{ width: '60%' }}></View>
        </View>
      </View>

      <View className="feedback__card">
        <View className={`feedback__icon ${isCorrect ? 'feedback__icon--ok' : 'feedback__icon--bad'}`}>
          <Text>{isCorrect ? '✓' : '✕'}</Text>
        </View>
        <Text className={`feedback__title ${isCorrect ? 'text-ok' : 'text-bad'}`}>
          {isCorrect ? 'Correct!' : 'Incorrect'}
        </Text>
        <Text className="feedback__subtitle">
          {isCorrect
            ? 'Great job on that one! Keep up the amazing work!'
            : "Do not worry, let us learn from this and keep moving forward."}
        </Text>

        {(showExplanation || !isCorrect) && (
          <View className="feedback__explanation">
            <Text className="feedback__label">The correct answer was:</Text>
            <Text className="feedback__answer">{correctOptionText}</Text>
            <View className="divider" />
            <Text className="feedback__detail">{explanation}</Text>
          </View>
        )}
      </View>

      <View className="footer-cta">
        {!showExplanation && isCorrect && (
          <View className="btn btn-ghost" onClick={() => setShowExplanation(true)}>
            <Text>Show Explanation</Text>
          </View>
        )}
        <View className="btn btn-primary" onClick={onNext}>
          <Text>Next Question</Text>
        </View>
      </View>
    </ScrollView>
  );
};

interface VoiceQuizScreenProps {
  onClose: () => void;
  onFinish: () => void;
}

const VoiceQuizScreen = ({ onClose, onFinish }: VoiceQuizScreenProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setHasRecorded(true);
    } else {
      setIsRecording(true);
      setHasRecorded(false);
    }
  };

  return (
    <ScrollView scrollY enableFlex className="screen voice">
      <View className="app-bar app-bar--simple">
        <View className="icon-btn icon-btn--ghost" onClick={onClose}>
          <Text>×</Text>
        </View>
        <Text className="app-bar__title">Comprehension Quiz</Text>
        <View className="app-bar__spacer" />
      </View>

      <View className="section">
        <View className="section__progress">
          <View className="progress-bar progress-bar--rounded">
            <View className="progress-bar__fill" style={{ width: '80%' }}></View>
          </View>
          <Text className="section__count">
            <Text className="highlight">4</Text>/5
          </Text>
        </View>
      </View>

      <View className="voice__question">
        <Text>Why was the Mars rover mission significant?</Text>
      </View>

      <View className="voice__mic-area">
        <View
          className={`voice__mic ${isRecording ? 'voice__mic--recording' : ''}`}
          onClick={toggleRecording}
        >
          <Text className="voice__mic-icon">{isRecording ? '■' : '🎤'}</Text>
        </View>
      </View>

      <Text className="voice__hint">
        {isRecording
          ? 'Listening... Tap to stop.'
          : hasRecorded
          ? 'Recorded! Tap submit to continue.'
          : 'Tap the microphone to start recording your answer.'}
      </Text>

      <View className="footer-cta">
        <View
          className={`btn ${hasRecorded ? 'btn-primary' : 'btn-disabled'}`}
          onClick={hasRecorded ? onFinish : undefined}
        >
          <Text>Submit</Text>
        </View>
      </View>
    </ScrollView>
  );
};

interface VoiceFeedbackScreenProps {
  onNext: () => void;
  onBack: () => void;
}

const VoiceFeedbackScreen = ({ onNext, onBack }: VoiceFeedbackScreenProps) => (
  <ScrollView scrollY enableFlex className="screen voice-feedback">
    <View className="app-bar app-bar--simple">
      <View className="icon-btn icon-btn--ghost" onClick={onBack}>
        <Text>←</Text>
      </View>
      <Text className="app-bar__title">Results</Text>
      <View className="app-bar__spacer" />
    </View>

    <View className="voice-feedback__badge">
      <Text className="voice-feedback__icon">✅</Text>
      <Text className="voice-feedback__title">Correct!</Text>
    </View>

    <View className="card">
      <Text className="card__title">Why was the Mars rover mission significant?</Text>
      <View className="qa">
        <View className="qa__item">
          <Text className="qa__label">Your Answer</Text>
          <Text className="qa__text">It discovered evidence of ancient microbial life.</Text>
        </View>
        <View className="qa__item qa__item--correct">
          <Text className="qa__label">Correct Answer</Text>
          <Text className="qa__text">It discovered evidence of ancient microbial life.</Text>
        </View>
      </View>
      <View className="divider" />
      <Text className="card__subtitle">Here is Why:</Text>
      <Text className="card__body">
        The article states the rover&apos;s primary achievement was uncovering biosignatures, which
        are strong indicators of past life, a landmark discovery in space exploration.
      </Text>
    </View>

    <Text className="section__title">Supporting Text in the Article</Text>
    <View className="card">
      <Text className="card__body">
        ...While analyzing rock samples from a dried-up riverbed, the rover&apos;s advanced
        instruments detected organic molecules. &quot;This is not definitive proof of life,&quot;
        cautioned lead scientist Dr. Aris Thorne, &quot;but it is a tremendously exciting sign.&quot;
        <Text className="highlight-block">
          The article states the rover&apos;s primary achievement was uncovering biosignatures, which
          are strong indicators of past life.
        </Text>
        These biosignatures, preserved in ancient clay deposits, suggest that Mars may have once
        harbored conditions suitable for life...
      </Text>
      <View className="card__link">
        <Text className="cta__link">View full article</Text>
      </View>
    </View>

    <View className="footer-cta">
      <View className="btn btn-primary" onClick={onNext}>
        <Text>Continue to Next Question</Text>
      </View>
    </View>
  </ScrollView>
);

interface QuizResultScreenProps {
  onBackToFeed: () => void;
}

const QuizResultScreen = ({ onBackToFeed }: QuizResultScreenProps) => (
  <ScrollView scrollY enableFlex className="screen quiz-result">
    <View className="app-bar app-bar--simple">
      <View className="icon-btn icon-btn--ghost" onClick={onBackToFeed}>
        <Text>←</Text>
      </View>
      <Text className="app-bar__title">Quiz Results</Text>
      <View className="app-bar__spacer" />
    </View>

    <View className="result__hero">
      <View className="result__medal">
        <Text>🏅</Text>
      </View>
      <Text className="result__score">8/10</Text>
      <Text className="result__headline">Great Job!</Text>
      <Text className="result__subtext">
        You have earned <Text className="highlight">+240 XP</Text> for this quiz!
      </Text>
    </View>

    <View className="section">
      <View className="section__header">
        <Text className="section__label">Your Score</Text>
        <Text className="section__label">80%</Text>
      </View>
      <View className="progress-bar progress-bar--rounded">
        <View className="progress-bar__fill" style={{ width: '80%' }}></View>
      </View>
    </View>

    <View className="stats-grid">
      <View className="stat-card">
        <View className="stat-card__icon stat-card__icon--ok">
          <Text>✓</Text>
        </View>
        <View>
          <Text className="stat-card__value">8</Text>
          <Text className="stat-card__label">Correct Answers</Text>
        </View>
      </View>
      <View className="stat-card">
        <View className="stat-card__icon stat-card__icon--bad">
          <Text>✕</Text>
        </View>
        <View>
          <Text className="stat-card__value">2</Text>
          <Text className="stat-card__label">Incorrect Answers</Text>
        </View>
      </View>
      <View className="stat-card stat-card--wide">
        <View className="stat-card__icon stat-card__icon--time">
          <Text>⏱</Text>
        </View>
        <View>
          <Text className="stat-card__value">2m 35s</Text>
          <Text className="stat-card__label">Time Taken</Text>
        </View>
      </View>
    </View>

    <View className="footer-cta footer-cta--stacked">
      <View className="btn btn-primary" onClick={onBackToFeed}>
        <Text>Back to News Feed</Text>
      </View>
      <View className="btn btn-ghost">
        <Text>Review Answers</Text>
      </View>
    </View>
  </ScrollView>
);

interface ProfileScreenProps {
  onBack: () => void;
}

const ProfileScreen = ({ onBack }: ProfileScreenProps) => (
  <ScrollView scrollY enableFlex className="screen profile">
    <View className="app-bar app-bar--simple">
      <View className="icon-btn icon-btn--ghost" onClick={onBack}>
        <Text>←</Text>
      </View>
      <Text className="app-bar__title">My Profile</Text>
      <View className="app-bar__spacer" />
    </View>

    <View className="profile__header">
      <Image
        mode="aspectFill"
        className="profile__avatar"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeKIf9kIY5g4Llo23C77k4tSWvxe9ZySrmGJgyhkKIVltItzW4kMjprB3OqltxC6LeHeRncP-FD9YQbR5GAFQFcluzpI4R-d8lgUmTvaeFaLfDs8rSAiCJj5kiDfQHaA_wwAZloHubI3xvy_8T8Xwth8_nYUEZWX_uV38h7j58ZCTIgMhfS6m3_2T8RusAOeJDj4pxImpqF9mVtWeK9TuDIEiNshFAXa0hPlMoV_10kYs-9SLe1UTD7fePErhPao2Vi9sDnAyby5o"
      />
      <Text className="profile__name">Alex Johnson</Text>
      <Text className="profile__grade">Grade 8</Text>
    </View>

    <View className="stat-row">
      <View className="stat-chip">
        <Text className="stat-chip__label">Quizzes Done</Text>
        <Text className="stat-chip__value">{DEMO_USER_STATS.quizzesDone}</Text>
      </View>
      <View className="stat-chip">
        <Text className="stat-chip__label">Accuracy</Text>
        <Text className="stat-chip__value">{DEMO_USER_STATS.accuracy}%</Text>
      </View>
      <View className="stat-chip">
        <Text className="stat-chip__label">Articles Read</Text>
        <Text className="stat-chip__value">{DEMO_USER_STATS.articlesRead}</Text>
      </View>
    </View>

    <View className="card">
      <View className="card__row">
        <View>
          <Text className="card__label">Current Level</Text>
          <Text className="card__metric">{DEMO_USER_STATS.lexileScore}L</Text>
        </View>
        <View className="segmented">
          <Text className="segmented__pill segmented__pill--active">Monthly</Text>
          <Text className="segmented__pill">All time</Text>
        </View>
      </View>
      <View className="chart chart--line">
        {LEXILE_HISTORY.map(point => (
          <View key={point.label} className="chart__bar">
            <View
              className="chart__bar-fill"
              style={{ height: `${(point.score / 900) * 100}%` }}
            ></View>
            <Text className="chart__label">{point.label}</Text>
          </View>
        ))}
      </View>
    </View>

    <View className="card">
      <View className="card__row">
        <View className="segmented">
          <Text className="segmented__pill segmented__pill--active">Weekly</Text>
          <Text className="segmented__pill">Monthly</Text>
        </View>
        <Text className="card__label">Accuracy</Text>
      </View>
      <View className="chart chart--bars">
        {WEEKLY_PROGRESS.map(point => (
          <View key={point.label} className="chart__bar chart__bar--wide">
            <View
              className="chart__bar-fill chart__bar-fill--primary"
              style={{ height: `${point.value}%` }}
            ></View>
            <Text className="chart__label">{point.label}</Text>
          </View>
        ))}
      </View>
    </View>

    <Text className="section__title">Recent Activity</Text>
    <View className="card card--list">
      {RECENT_ACTIVITY.map(item => (
        <View key={item.id} className="list-item">
          <View className="list-item__icon">📝</View>
          <View className="list-item__body">
            <Text className="list-item__title">{item.title}</Text>
            <Text className="list-item__meta">{item.date}</Text>
          </View>
          <Text className="list-item__score">{item.score}</Text>
        </View>
      ))}
    </View>
  </ScrollView>
);

export default function Index() {
  const [screen, setScreen] = useState<Screen>(Screen.LANDING);
  const [activeArticleId, setActiveArticleId] = useState(ARTICLES[0].id);
  const [mcCorrect, setMcCorrect] = useState(false);

  const activeArticle = useMemo(
    () => ARTICLES.find(item => item.id === activeArticleId) || ARTICLES[0],
    [activeArticleId],
  );

  const goTo = (next: Screen) => {
    setScreen(next);
  };

  const handleArticleClick = (id: string) => {
    setActiveArticleId(id);
    goTo(Screen.ARTICLE);
  };

  const handleMCSubmit = (optionId: string) => {
    setMcCorrect(optionId === MOCK_QUIZ.correctOptionId);
    goTo(Screen.MC_FEEDBACK);
  };

  switch (screen) {
    case Screen.LANDING:
      return <LandingScreen onGetStarted={() => goTo(Screen.FEED)} />;
    case Screen.FEED:
      return (
        <NewsFeedScreen
          onArticleClick={handleArticleClick}
          onProfileClick={() => goTo(Screen.PROFILE)}
        />
      );
    case Screen.ARTICLE:
      return (
        <ArticleScreen
          article={activeArticle}
          onBack={() => goTo(Screen.FEED)}
          onStartQuiz={() => goTo(Screen.QUIZ)}
        />
      );
    case Screen.QUIZ:
      return <QuizScreen onClose={() => goTo(Screen.ARTICLE)} onSubmit={handleMCSubmit} />;
    case Screen.MC_FEEDBACK:
      return (
        <MCFeedbackScreen
          isCorrect={mcCorrect}
          correctOptionText={
            MOCK_QUIZ.options.find(opt => opt.id === MOCK_QUIZ.correctOptionId)?.text || ''
          }
          explanation={MOCK_QUIZ.explanation}
          onNext={() => goTo(Screen.VOICE_QUIZ)}
        />
      );
    case Screen.VOICE_QUIZ:
      return <VoiceQuizScreen onClose={() => goTo(Screen.FEED)} onFinish={() => goTo(Screen.VOICE_FEEDBACK)} />;
    case Screen.VOICE_FEEDBACK:
      return (
        <VoiceFeedbackScreen
          onBack={() => goTo(Screen.VOICE_QUIZ)}
          onNext={() => goTo(Screen.QUIZ_RESULT)}
        />
      );
    case Screen.QUIZ_RESULT:
      return <QuizResultScreen onBackToFeed={() => goTo(Screen.FEED)} />;
    case Screen.PROFILE:
      return <ProfileScreen onBack={() => goTo(Screen.FEED)} />;
    default:
      return <LandingScreen onGetStarted={() => goTo(Screen.FEED)} />;
  }
}
