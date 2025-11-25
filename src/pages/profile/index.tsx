import Taro from '@tarojs/taro';
import { ScrollView, Text, View, Image } from '@tarojs/components';
import { DEMO_USER_STATS, LEXILE_HISTORY, RECENT_ACTIVITY, WEEKLY_PROGRESS } from '../shared/data';
import '../index/index.scss';
import './index.scss';

const ProfilePage = () => {
  const handleBack = () => Taro.navigateBack();

  return (
    <ScrollView scrollY enableFlex className="screen profile">
      <View className="app-bar app-bar--simple">
        <View className="icon-btn icon-btn--ghost" onClick={handleBack}>
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
            <View className="list-item__icon">
              <View className="icon icon--note"></View>
            </View>
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
};

export default ProfilePage;
