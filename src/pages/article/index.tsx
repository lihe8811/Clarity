import Taro, { useRouter } from '@tarojs/taro';
import { useEffect, useMemo, useState } from 'react';
import { Button, Image, ScrollView, Text, View } from '@tarojs/components';
import { ARTICLES } from '../shared/data';
import { Article } from '../shared/types';
import '../index/index.scss';
import './index.scss';

const ArticlePage = () => {
  const router = useRouter();
  const [articleId, setArticleId] = useState<string>(ARTICLES[0].id);

  useEffect(() => {
    if (router.params?.id) {
      setArticleId(router.params.id);
    }
  }, [router.params?.id]);

  const article: Article =
    useMemo(() => ARTICLES.find(item => item.id === articleId) || ARTICLES[0], [articleId]);

  const handleBack = () => {
    Taro.navigateBack();
  };

  const handleStartQuiz = () => {
    Taro.navigateTo({ url: `/pages/quiz/index?id=${article.id}` });
  };

  return (
    <ScrollView scrollY enableFlex className="screen article">
      <View className="article__top">
        <View className="icon-btn" onClick={handleBack}>
          <Text>←</Text>
        </View>
        <View className="article__actions">
          <View className="icon-btn">
            <View className="icon icon--share" />
          </View>
          <View className="icon-btn">
            <View className="icon icon--save" />
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
        <Button className="btn btn-primary" onClick={handleStartQuiz}>
          <Text>Start Questions</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default ArticlePage;
