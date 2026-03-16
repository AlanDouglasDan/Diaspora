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
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { common, palette } from "core/styles";
import { images } from "core/images";
import { TabNav } from "components/tabNav";
import { Button } from "components/button";
import { SuccessNotification } from "components/successNotification";

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
    handleRefresh,
    isRefreshing,
    isLoading,
    handleLikeFromViews,
    loadingUserId,
    handleOpenConversation,
    handleGetSwiping,
    hasLikedUser,
    handleDislikeFromViews,
    successInfo,
    hideSuccess,
    isSubscribed,
    handleOpenUpgradeSheet,
  } = useLikesLogic();

  const { title, subtitle } = getHeaderContent();

  const renderItem: ListRenderItem<LikeItem> = useCallback(
    ({ item }) => {
      const imageSource =
        typeof item.image === "string" ? { uri: item.image } : item.image;
      const hasValidImage =
        typeof item.image === "string" ? item.image.length > 0 : true;
      const alreadyLiked = item.userId ? hasLikedUser(item.userId) : false;
      const isItemLoading = item.userId === loadingUserId;

      // If not subscribed, blur all cards and show upgrade sheet on press
      const shouldBlur = !isSubscribed;

      const handleCardPress = () => {
        if (!isSubscribed) {
          handleOpenUpgradeSheet(item.image);
          return;
        }
        handleOpenConversation(item);
      };

      return (
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.9}
          onPress={handleCardPress}
        >
          {hasValidImage ? (
            <Image
              source={imageSource}
              style={styles.cardImage}
              blurRadius={shouldBlur ? 16 : 0}
              contentFit="cover"
            />
          ) : (
            <View
              style={[styles.cardImage, { backgroundColor: palette.GREY }]}
            />
          )}
          <View style={styles.cardOverlay}>
            {/* Top section: name + recently active on left, gradient icon on right for priority */}
            <View style={styles.cardTopSection}>
              <View style={styles.cardTopLeft}>
                {item.userName && (
                  <Text style={styles.cardUserName} numberOfLines={1}>
                    {item.userName}, {item.age}
                  </Text>
                )}
                {item.isRecentlyActive && (
                  <View style={styles.recentlyActiveBadgeInline}>
                    <View style={styles.greenDot} />
                    <Text style={styles.badgeText}>Recently active</Text>
                  </View>
                )}
              </View>

              {/* Priority Aisles: small gradient star icon, not pressable */}
              {activeTab === "priority" && (
                <LinearGradient
                  colors={[palette.RED2, palette.RED]}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  style={styles.priorityGradientIcon}
                >
                  <FontAwesome name="heart" size={10} color={palette.WHITE} />
                </LinearGradient>
              )}
            </View>

            {/* Bottom section: icons based on tab */}
            <View style={styles.cardBottomSection}>
              {/* Your Likes tab: superlike icon at bottom-right */}
              {activeTab === "likes" && (
                <View style={styles.likesBottomRow}>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => {
                      if (!isSubscribed) {
                        handleOpenUpgradeSheet(item.image);
                        return;
                      }
                      handleLikeFromViews(item, true);
                    }}
                    disabled={isItemLoading || alreadyLiked}
                  >
                    <View
                      style={[
                        styles.superLikeIcon,
                        alreadyLiked && styles.greyedOutIcon,
                      ]}
                    >
                      {isItemLoading ? (
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
                </View>
              )}

              {/* Views tab: dislike + like buttons space-between */}
              {activeTab === "views" && (
                <View style={styles.viewsBottomRow}>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => {
                      if (!isSubscribed) {
                        handleOpenUpgradeSheet(item.image);
                        return;
                      }
                      handleDislikeFromViews(item);
                    }}
                    disabled={isItemLoading || alreadyLiked}
                  >
                    <View
                      style={[
                        styles.dislikeIcon,
                        alreadyLiked && styles.greyedOutIcon,
                      ]}
                    >
                      {isItemLoading ? (
                        <ActivityIndicator size="small" color={palette.BLACK} />
                      ) : (
                        <Entypo name="cross" size={20} color={palette.WHITE} />
                      )}
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => {
                      if (!isSubscribed) {
                        handleOpenUpgradeSheet(item.image);
                        return;
                      }
                      handleLikeFromViews(item, false);
                    }}
                    disabled={isItemLoading || alreadyLiked}
                  >
                    <View
                      style={[
                        styles.likeHeartIcon,
                        alreadyLiked && styles.greyedOutIcon,
                      ]}
                    >
                      {isItemLoading ? (
                        <ActivityIndicator size="small" color={palette.RED} />
                      ) : (
                        <FontAwesome
                          name="heart"
                          size={14}
                          color={alreadyLiked ? palette.WHITE : palette.RED}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      );
    },
    [
      activeTab,
      handleLikeFromViews,
      handleDislikeFromViews,
      loadingUserId,
      handleOpenConversation,
      hasLikedUser,
      isSubscribed,
      handleOpenUpgradeSheet,
    ],
  );

  const keyExtractor = useCallback((item: LikeItem) => item.id, []);

  const ListHeader = useCallback(
    () => (
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    ),
    [title, subtitle],
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
    [activeTab, handleGetSwiping],
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
      <SuccessNotification
        visible={successInfo.visible}
        title={successInfo.title}
        message={successInfo.message}
        onHide={hideSuccess}
      />
      <TabNav
        tabs={tabs}
        value={activeTab}
        onChange={handleTabChange}
        style={styles.tabNav}
      />
      {isEmpty ? (
        <ScrollView
          contentContainerStyle={styles.emptyScrollContent}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor={palette.PINK}
              colors={[palette.PINK]}
            />
          }
        >
          <EmptyState />
        </ScrollView>
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
