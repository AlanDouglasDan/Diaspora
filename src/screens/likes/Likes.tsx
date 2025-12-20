import React, { FC, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ListRenderItem,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";

import { common, palette } from "core/styles";
import { images } from "core/images";
import { TabNav } from "components/tabNav";
import { Button } from "components/button";

import { styles } from "./Likes.styles";
import { useLikesLogic } from "./useLikesLogic";
import type { LikeItem } from "./Likes.types";

const Likes: FC = () => {
  const {
    tabs,
    activeTab,
    handleTabChange,
    likes,
    getHeaderContent,
    showHeartIcon,
    blurImages,
    handleOpenUpgradeSheet,
  } = useLikesLogic();

  const { title, subtitle } = getHeaderContent();

  const renderItem: ListRenderItem<LikeItem> = useCallback(
    ({ item }) => {
      return (
        <View style={styles.card}>
          <Image
            source={item.image}
            style={styles.cardImage}
            blurRadius={blurImages ? 16 : 0}
          />
          <View style={styles.cardOverlay}>
            <View style={styles.badgeContainer}>
              {item.isRecentlyActive && (
                <View style={styles.recentlyActiveBadge}>
                  <View style={styles.greenDot} />
                  <Text style={styles.badgeText}>Recently active</Text>
                </View>
              )}
            </View>
            <View style={styles.likeIconContainer}>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => handleOpenUpgradeSheet(item.image)}
              >
                <View style={styles.superLikeIcon}>
                  <FontAwesome name="star" size={16} color={palette.WHITE} />
                </View>
              </TouchableOpacity>

              {showHeartIcon ? (
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => handleOpenUpgradeSheet(item.image)}
                >
                  <View style={styles.heartIcon}>
                    <FontAwesome name="heart" size={16} color={palette.RED} />
                  </View>
                </TouchableOpacity>
              ) : (
                <View />
              )}
            </View>
          </View>
        </View>
      );
    },
    [blurImages, handleOpenUpgradeSheet, showHeartIcon]
  );

  const keyExtractor = useCallback((item: LikeItem) => item.id, []);

  const ListHeader = useCallback(
    () => (
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    ),
    [title, subtitle]
  );

  const EmptyState = useCallback(
    () => (
      <View style={styles.emptyStateContainer}>
        <Image
          source={images.emptyState}
          style={styles.emptyStateImage}
          resizeMode="contain"
        />

        <Text style={styles.emptyStateTitle}>oops! Its just you here</Text>
        <Text style={styles.emptyStateSubtitle}>
          It's too quiet in here, let's find you some matches.
        </Text>

        <Button title="Get Swiping" style={common.w100} />
      </View>
    ),
    []
  );

  const isEmpty = likes.length === 0;
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <TabNav
        tabs={tabs}
        value={activeTab}
        onChange={handleTabChange}
        style={styles.tabNav}
      />
      {isEmpty ? (
        <EmptyState />
      ) : (
        <FlatList
          data={likes}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          numColumns={2}
          ListHeaderComponent={ListHeader}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default Likes;
