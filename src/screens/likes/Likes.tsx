import React, { FC, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Image as RNImage,
} from "react-native";
import { Image } from "expo-image";
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
    showActionButtons,
    blurImages,
    handleOpenUpgradeSheet,
    handleRefresh,
    isRefreshing,
    isLoading,
    handleLikeFromViews,
    isLikeLoading,
    handleOpenConversation,
    handleGetSwiping,
  } = useLikesLogic();

  const { title, subtitle } = getHeaderContent();

  const renderItem: ListRenderItem<LikeItem> = useCallback(
    ({ item }) => {
      // Determine image source - handle both string URLs and ImageSourcePropType
      const imageSource =
        typeof item.image === "string" ? { uri: item.image } : item.image;
      const hasValidImage =
        typeof item.image === "string" ? item.image.length > 0 : true;

      return (
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.9}
          onPress={() => handleOpenConversation(item)}
        >
          {hasValidImage ? (
            <Image
              source={imageSource}
              style={styles.cardImage}
              blurRadius={blurImages ? 16 : 0}
              contentFit="cover"
            />
          ) : (
            <View
              style={[styles.cardImage, { backgroundColor: palette.GREY }]}
            />
          )}
          <View style={styles.cardOverlay}>
            <View style={styles.badgeContainer}>
              {item.isRecentlyActive && (
                <View style={styles.recentlyActiveBadge}>
                  <View style={styles.greenDot} />
                  <Text style={styles.badgeText}>Recently active</Text>
                </View>
              )}
            </View>

            {/* Icon logic for Priority Aisles and Your Likes */}
            {activeTab === "priority" && !item.superLike && (
              <View style={styles.priorityLikeIcon}>
                <FontAwesome name="star" size={16} color={palette.WHITE} />
              </View>
            )}

            {showActionButtons && (
              <View style={styles.likeIconContainer}>
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => handleLikeFromViews(item, true)}
                  disabled={isLikeLoading}
                >
                  <View
                    style={[
                      styles.superLikeIcon,
                      isLikeLoading && { opacity: 0.6 },
                    ]}
                  >
                    {isLikeLoading ? (
                      <ActivityIndicator size="small" color={palette.WHITE} />
                    ) : (
                      <FontAwesome
                        name="star"
                        size={16}
                        color={palette.WHITE}
                      />
                    )}
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => handleLikeFromViews(item, false)}
                  disabled={isLikeLoading}
                >
                  <View
                    style={[
                      styles.heartIcon,
                      isLikeLoading && { opacity: 0.6 },
                    ]}
                  >
                    {isLikeLoading ? (
                      <ActivityIndicator size="small" color={palette.RED} />
                    ) : (
                      <FontAwesome name="heart" size={16} color={palette.RED} />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </TouchableOpacity>
      );
    },
    [
      blurImages,
      showActionButtons,
      handleLikeFromViews,
      isLikeLoading,
      handleOpenConversation,
    ]
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
        <RNImage
          source={images.emptyState}
          style={styles.emptyStateImage}
          resizeMode="contain"
        />

        <Text style={styles.emptyStateTitle}>Oops! It's just you here</Text>
        <Text style={styles.emptyStateSubtitle}>
          {activeTab === "priority"
            ? "No one has super liked you yet. Keep your profile active!"
            : activeTab === "likes"
              ? "No one has liked you yet. Get out there and start swiping!"
              : "No one has viewed your profile yet. Update your photos!"}
        </Text>

        <Button
          title="Get Swiping"
          style={common.w100}
          onPress={handleGetSwiping}
        />
      </View>
    ),
    [activeTab, handleGetSwiping]
  );

  const isEmpty = likes.length === 0 && !isLoading;
  const insets = useSafeAreaInsets();

  if (isLoading && likes.length === 0) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <TabNav
          tabs={tabs}
          value={activeTab}
          onChange={handleTabChange}
          style={styles.tabNav}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={palette.PINK} />
        </View>
      </View>
    );
  }

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
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor={palette.PINK}
              colors={[palette.PINK]}
            />
          }
        />
      )}
    </View>
  );
};

export default Likes;
