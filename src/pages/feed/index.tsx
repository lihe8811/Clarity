import Taro from '@tarojs/taro';
import { useMemo, useState } from 'react';
import { Image, ScrollView, Text, View } from '@tarojs/components';
import { ARTICLES } from '../shared/data';
import '../index/index.scss';
import './index.scss';

const FeedPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Science', 'Technology', 'World', 'Arts', 'History'];
  const featuredArticle = ARTICLES[0];
  const filteredArticles = useMemo(
    () =>
      activeCategory === 'All'
        ? ARTICLES
        : ARTICLES.filter(article => article.category === activeCategory),
    [activeCategory],
  );

  const handleArticleClick = (id: string) => {
    Taro.navigateTo({ url: `/pages/article/index?id=${id}` });
  };

  const handleProfileClick = () => {
    Taro.navigateTo({ url: '/pages/profile/index' });
  };

  return (
    <ScrollView scrollY enableFlex className="screen feed">
      <View className="app-bar">
        <View className="app-bar__icon">
          <View className="icon icon--menu" />
        </View>
        <Text className="app-bar__title">Latest News</Text>
        <View className="app-bar__avatar" onClick={handleProfileClick}>
          <Text>AJ</Text>
        </View>
      </View>

      <View className="feed-hero" onClick={() => handleArticleClick(featuredArticle.id)}>
        <View className="feed-hero__badge">Editor&apos;s pick</View>
        <Text className="feed-hero__title">{featuredArticle.title}</Text>
        <Text className="feed-hero__meta">
          {featuredArticle.source} • {featuredArticle.timeAgo}
        </Text>
        <View className="feed-hero__image">
          <Image mode="aspectFill" src={featuredArticle.imageUrl} />
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
            onClick={() => handleArticleClick(article.id)}
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
                  <View className="progress__icon">
                    <View className="icon icon--target" />
                  </View>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>

      <View className="fab">
        <View className="fab__button">
          <View className="icon icon--trophy" />
        </View>
      </View>
    </ScrollView>
  );
};

export default FeedPage;
