import Taro, { useRouter } from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { Button, ScrollView, Text, View } from '@tarojs/components';
import { MOCK_QUIZ } from '../shared/data';
import '../index/index.scss';
import './index.scss';

type Step = 'MC' | 'MC_FEEDBACK' | 'VOICE' | 'VOICE_FEEDBACK' | 'RESULT';

const MCStep = ({
  selected,
  onSelect,
  onSubmit,
}: {
  selected: string | null;
  onSelect: (id: string) => void;
  onSubmit: () => void;
}) => {
  const hasSubmitted = !!selected;
  const isCorrect = selected === MOCK_QUIZ.correctOptionId;

  return (
    <ScrollView scrollY enableFlex className="screen quiz-screen">
      <View className="top-row">
        <View className="circle-btn" onClick={() => Taro.navigateBack()}>
          <Text>×</Text>
        </View>
        <View className="top-row__title">
          <Text className="eyebrow">Comprehension</Text>
          <Text className="muted">3/10 Questions</Text>
        </View>
        <View className="top-row__spacer" />
      </View>

      <View className="bar bar--thin">
        <View className="bar__fill" style={{ width: '30%' }} />
      </View>

      <View className="question-block">
        <Text className="question-text">{MOCK_QUIZ.text}</Text>
      </View>

      <View className="option-list">
        {MOCK_QUIZ.options.map(option => {
          const isSelected = selected === option.id;
          const isAnswer = option.id === MOCK_QUIZ.correctOptionId;
          const showCorrect = hasSubmitted && isAnswer;
          const showWrong = hasSubmitted && isSelected && !isAnswer;
          return (
            <View
              key={option.id}
              className={`option-card ${showCorrect ? 'option-card--correct' : ''} ${
                showWrong ? 'option-card--wrong' : ''
              } ${!hasSubmitted && isSelected ? 'option-card--active' : ''}`}
              onClick={() => onSelect(option.id)}
            >
              <View className="option-card__icon">
                {showCorrect && <Text className="material-symbols-rounded">check</Text>}
                {showWrong && <Text className="material-symbols-rounded">close</Text>}
              </View>
              <Text className="option-card__text">{option.text}</Text>
            </View>
          );
        })}
      </View>

      {hasSubmitted && (
        <View className="inline-feedback">
          <View className={`inline-feedback__icon ${isCorrect ? 'ok' : 'bad'}`}>
            <Text className="material-symbols-rounded">{isCorrect ? 'check' : 'close'}</Text>
          </View>
          <View>
            <Text className={`inline-feedback__title ${isCorrect ? 'ok' : 'bad'}`}>
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </Text>
            <Text className="inline-feedback__hint">{MOCK_QUIZ.explanation}</Text>
          </View>
        </View>
      )}

      <View className="footer-cta">
        <Button
          className={`btn ${hasSubmitted ? 'btn-primary' : 'btn-disabled'}`}
          onClick={onSubmit}
          disabled={!hasSubmitted}
        >
          <Text>Next Question</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

const MCFeedbackStep = ({
  isCorrect,
  correctOptionText,
  explanation,
  onNext,
}: {
  isCorrect: boolean;
  correctOptionText: string;
  explanation: string;
  onNext: () => void;
}) => {
  const [showExplanation, setShowExplanation] = useState(true);

  return (
    <ScrollView scrollY enableFlex className="screen mc-feedback">
      <View className="section">
        <View className="section__header">
          <Text className="section__label">Progress</Text>
          <Text className="section__label">3/5</Text>
        </View>
        <View className="bar bar--thin">
          <View className="bar__fill" style={{ width: '60%' }} />
        </View>
      </View>

      <View className="mc-feedback__status">
        <View className={`mc-feedback__badge ${isCorrect ? 'ok' : 'bad'}`}>
          <Text className="material-symbols-rounded">{isCorrect ? 'check' : 'close'}</Text>
        </View>
        <Text className={`mc-feedback__title ${isCorrect ? 'ok' : 'bad'}`}>
          {isCorrect ? 'Correct!' : 'Incorrect'}
        </Text>
        <Text className="mc-feedback__subtitle">
          {isCorrect
            ? 'Great job on that one! Keep up the amazing work!'
            : "Do not worry, let us learn from this and keep moving forward."}
        </Text>
      </View>

      <View className="mc-feedback__card">
        <Text className="mc-feedback__label">The correct answer was:</Text>
        <Text className="mc-feedback__answer">{correctOptionText}</Text>
        <View className="divider" />
        {showExplanation && <Text className="mc-feedback__detail">{explanation}</Text>}
      </View>

      <View className="footer-cta">
        <Button className="btn btn-ghost" onClick={() => setShowExplanation(prev => !prev)}>
          <Text>{showExplanation ? 'Hide Explanation' : 'Show Explanation'}</Text>
        </Button>
        <Button className="btn btn-primary" onClick={onNext}>
          <Text>Next Question</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

const VoiceStep = ({ onFinish }: { onFinish: () => void }) => {
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
    <ScrollView scrollY enableFlex className="screen voice-screen">
      <View className="top-row">
        <View className="circle-btn circle-btn--ghost" onClick={() => Taro.navigateBack()}>
          <Text>×</Text>
        </View>
        <View className="top-row__title">
          <Text>Comprehension Quiz</Text>
        </View>
        <View className="top-row__spacer" />
      </View>

      <View className="progress-line">
        <View className="bar bar--thin">
          <View className="bar__fill" style={{ width: '40%' }} />
        </View>
        <Text className="progress-line__count">2/5</Text>
      </View>

      <View className="question-block">
        <Text className="question-text">
          Based on the article, what is the main reason for the recent decline in bee populations?
        </Text>
      </View>

      <View className="voice-mic-area">
        <View
          className={`voice-mic ${isRecording ? 'voice-mic--recording' : ''}`}
          onClick={toggleRecording}
        >
          <View className={`voice-mic__icon ${isRecording ? 'voice-mic__icon--stop' : ''}`}>
            <View className={`icon ${isRecording ? 'icon--stop' : 'icon--mic'}`} />
          </View>
        </View>
      </View>

      <Text className="voice-hint">
        {isRecording
          ? 'Listening... Tap to stop.'
          : hasRecorded
          ? 'Recorded! Tap submit to continue.'
          : 'Tap the microphone to start recording your answer.'}
      </Text>

      <View className="footer-cta">
        <Button
          className={`btn ${hasRecorded ? 'btn-primary' : 'btn-disabled'}`}
          onClick={hasRecorded ? onFinish : undefined}
          disabled={!hasRecorded}
        >
          <Text>Submit</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

const VoiceFeedbackStep = ({ onNext }: { onNext: () => void }) => (
  <ScrollView scrollY enableFlex className="screen voice-feedback">
    <View className="top-row top-row--back">
      <View className="circle-btn circle-btn--ghost" onClick={() => Taro.navigateBack()}>
        <Text>←</Text>
      </View>
      <View className="top-row__title">
        <Text>Results</Text>
      </View>
      <View className="top-row__spacer" />
    </View>

    <View className="pill pill--success">
      <View className="pill__icon">
        <Text className="material-symbols-rounded">check</Text>
      </View>
      <Text>Correct!</Text>
    </View>

    <View className="result-card">
      <Text className="result-card__question">Why was the Mars rover mission significant?</Text>

      <View className="result-card__answer">
        <View className="result-card__chip">
          <Text>Your Answer</Text>
        </View>
        <Text className="result-card__text">It discovered evidence of ancient microbial life.</Text>
      </View>

      <View className="result-card__answer result-card__answer--correct">
        <View className="result-card__chip result-card__chip--ok">
          <Text>Correct Answer</Text>
        </View>
        <Text className="result-card__text">It discovered evidence of ancient microbial life.</Text>
      </View>

      <Text className="result-card__label">Here&apos;s Why:</Text>
      <Text className="result-card__body">
        The article states the rover&apos;s primary achievement was uncovering biosignatures, which
        are strong indicators of past life, a landmark discovery in space exploration.
      </Text>
    </View>

    <Text className="section__title">Supporting Text in the Article</Text>
    <View className="support-card">
      <Text className="support-card__body">
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
      <View className="support-card__link">
        <Text className="cta__link">View full article</Text>
      </View>
    </View>

    <View className="footer-cta">
      <Button className="btn btn-primary" onClick={onNext}>
        <Text>Continue to Next Question</Text>
      </Button>
    </View>
  </ScrollView>
);

const ResultStep = () => (
  <ScrollView scrollY enableFlex className="screen quiz-result">
    <View className="app-bar app-bar--simple">
      <View className="icon-btn icon-btn--ghost" onClick={() => Taro.reLaunch({ url: '/pages/feed/index' })}>
        <Text>←</Text>
      </View>
      <Text className="app-bar__title">Quiz Results</Text>
      <View className="app-bar__spacer" />
    </View>

    <View className="result__hero">
      <View className="result__medal">
        <View className="icon icon--medal" />
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
          <View className="icon icon--check" />
        </View>
        <View>
          <Text className="stat-card__value">8</Text>
          <Text className="stat-card__label">Correct Answers</Text>
        </View>
      </View>
      <View className="stat-card">
        <View className="stat-card__icon stat-card__icon--bad">
          <View className="icon icon--close" />
        </View>
        <View>
          <Text className="stat-card__value">2</Text>
          <Text className="stat-card__label">Incorrect Answers</Text>
        </View>
      </View>
      <View className="stat-card stat-card--wide">
        <View className="stat-card__icon stat-card__icon--time">
          <View className="icon icon--clock" />
        </View>
        <View>
          <Text className="stat-card__value">2m 35s</Text>
          <Text className="stat-card__label">Time Taken</Text>
        </View>
      </View>
    </View>

    <View className="footer-cta footer-cta--stacked">
      <Button className="btn btn-primary" onClick={() => Taro.reLaunch({ url: '/pages/feed/index' })}>
        <Text>Back to News Feed</Text>
      </Button>
      <Button className="btn btn-ghost">
        <Text>Review Answers</Text>
      </Button>
    </View>
  </ScrollView>
);

const QuizPage = () => {
  const router = useRouter();
  const [step, setStep] = useState<Step>('MC');
  const [selected, setSelected] = useState<string | null>(null);
  const [mcCorrect, setMcCorrect] = useState(false);

  useEffect(() => {
    // placeholder for future article-specific logic when article id is present
  }, [router.params?.id]);

  const handleMCSubmit = () => {
    if (!selected) return;
    setMcCorrect(selected === MOCK_QUIZ.correctOptionId);
    setStep('MC_FEEDBACK');
  };

  const goToVoice = () => setStep('VOICE');
  const goToVoiceFeedback = () => setStep('VOICE_FEEDBACK');
  const goToResult = () => setStep('RESULT');

  switch (step) {
    case 'MC':
      return <MCStep selected={selected} onSelect={setSelected} onSubmit={handleMCSubmit} />;
    case 'MC_FEEDBACK':
      return (
        <MCFeedbackStep
          isCorrect={mcCorrect}
          correctOptionText={
            MOCK_QUIZ.options.find(opt => opt.id === MOCK_QUIZ.correctOptionId)?.text || ''
          }
          explanation={MOCK_QUIZ.explanation}
          onNext={goToVoice}
        />
      );
    case 'VOICE':
      return <VoiceStep onFinish={goToVoiceFeedback} />;
    case 'VOICE_FEEDBACK':
      return <VoiceFeedbackStep onNext={goToResult} />;
    case 'RESULT':
      return <ResultStep />;
    default:
      return <MCStep selected={selected} onSelect={setSelected} onSubmit={handleMCSubmit} />;
  }
};

export default QuizPage;
