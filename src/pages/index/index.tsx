import Taro from '@tarojs/taro';
import { Button, Image, ScrollView, Text, View } from '@tarojs/components';
import { DEMO_USER_STATS } from '../shared/data';
import './index.scss';

interface LandingScreenProps {
  onGetStarted: () => void;
}

const LandingScreen = ({ onGetStarted }: LandingScreenProps) => (
  <ScrollView scrollY enableFlex className="screen landing">
    <View className="landing__content">
      <View className="landing__badge">
        <Text>Adaptive ESL News</Text>
        <Text className="landing__dot">•</Text>
        <Text>Built for growth</Text>
      </View>
      <View className="landing__icon">
        <View className="icon icon--news"></View>
      </View>
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
      <View className="landing__highlights">
        <View className="pill pill--soft">
          <Text>Daily curated briefings</Text>
        </View>
        <View className="pill pill--soft">
          <Text>Level-aware questions</Text>
        </View>
        <View className="pill pill--soft">
          <Text>Voice & reading practice</Text>
        </View>
      </View>
      <View className="landing__stats">
        <View className="mini-card">
          <Text className="mini-card__label">Lexile</Text>
          <Text className="mini-card__value">{DEMO_USER_STATS.lexileScore}L</Text>
          <Text className="mini-card__hint">+15 this week</Text>
        </View>
        <View className="mini-card">
          <Text className="mini-card__label">Accuracy</Text>
          <Text className="mini-card__value">{DEMO_USER_STATS.accuracy}%</Text>
          <Text className="mini-card__hint">Steady improvement</Text>
        </View>
        <View className="mini-card">
          <Text className="mini-card__label">Quizzes</Text>
          <Text className="mini-card__value">{DEMO_USER_STATS.quizzesDone}</Text>
          <Text className="mini-card__hint">Last 30 days</Text>
        </View>
      </View>
    </View>
    <View className="cta">
      <Button className="btn btn-primary" onClick={onGetStarted}>
        <Text>Get Started</Text>
      </Button>
      <Text className="cta__hint">
        Already have an account? <Text className="cta__link">Log In</Text>
      </Text>
    </View>
  </ScrollView>
);

export default function Index() {
  const handleGetStarted = () => {
    Taro.reLaunch({ url: '/pages/feed/index' });
  };

  return <LandingScreen onGetStarted={handleGetStarted} />;
}
