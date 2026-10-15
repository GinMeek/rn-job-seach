import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  Animated,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./menudrawer.style";
import { images } from "../../../constants";
import { useFavorites } from "../../../context/FavoritesContext";

const techCategories = [
  "React",
  "React Native",
  "Python",
  "TypeScript",
  "Full-time",
  "Design",
  "Engineering",
];

const MenuDrawer = ({ visible, onClose, onRefreshData }) => {
  const router = useRouter();
  const { favorites } = useFavorites();
  const slideAnim = useRef(new Animated.Value(-340)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -340,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleNavigate = (path) => {
    onClose();
    setTimeout(() => {
      router.push(path);
    }, 150);
  };

  const handleRefreshCache = async () => {
    setIsRefreshing(true);
    if (onRefreshData) {
      await onRefreshData();
    }
    setTimeout(() => {
      setIsRefreshing(false);
      Alert.alert("Cache Cleared", "Job feeds successfully refreshed with latest positions.");
    }, 400);
  };


  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        {/* Backdrop overlay */}
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]} />
        </TouchableWithoutFeedback>

        {/* Slide-out drawer content */}
        <Animated.View
          style={[
            styles.drawerContainer,
            { transform: [{ translateX: slideAnim }] },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.brandRow}>
              <Image
                source={images.logo}
                style={styles.logoImage}
                resizeMode="contain"
              />
              <View style={styles.titleCol}>
                <Text style={styles.brandTitle}>JobPulse</Text>
                <Text style={styles.brandSubtitle}>v1.0.0 • Open Job Search</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.closeBtn}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Quick Navigation */}
            <Text style={styles.sectionTitle}>Quick Navigation</Text>

            <TouchableOpacity
              style={[styles.navItem, styles.navItemHighlight]}
              onPress={() => handleNavigate("/favorites")}
              activeOpacity={0.7}
            >
              <Text style={styles.navIcon}>❤️</Text>
              <Text style={[styles.navLabel, styles.navLabelHighlight]}>
                Saved Jobs
              </Text>
              <View style={styles.badgePillHighlight}>
                <Text style={styles.badgeTextHighlight}>
                  {favorites.length}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navItem}
              onPress={() => handleNavigate("/search/Developer")}
              activeOpacity={0.7}
            >
              <Text style={styles.navIcon}>🔍</Text>
              <Text style={styles.navLabel}>Search All Jobs</Text>
              <View style={styles.badgePill}>
                <Text style={styles.badgeText}>300+</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navItem}
              onPress={() => handleNavigate("/search/Featured")}
              activeOpacity={0.7}
            >
              <Text style={styles.navIcon}>💼</Text>
              <Text style={styles.navLabel}>Featured Roles</Text>
              <View style={styles.badgePill}>
                <Text style={styles.badgeText}>Top</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navItem}
              onPress={() => handleNavigate("/search/Latest")}
              activeOpacity={0.7}
            >
              <Text style={styles.navIcon}>⚡</Text>
              <Text style={styles.navLabel}>Latest Positions</Text>
              <View style={styles.badgePill}>
                <Text style={styles.badgeText}>New</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navItem}
              onPress={() => handleNavigate("/search/Remote")}
              activeOpacity={0.7}
            >
              <Text style={styles.navIcon}>🌐</Text>
              <Text style={styles.navLabel}>Remote Only</Text>
              <View style={styles.badgePill}>
                <Text style={styles.badgeText}>Global</Text>
              </View>
            </TouchableOpacity>

            {/* Popular Tech Categories */}
            <Text style={styles.sectionTitle}>Explore by Stack</Text>
            <View style={styles.categoriesGrid}>
              {techCategories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={styles.categoryChip}
                  onPress={() => handleNavigate(`/search/${cat}`)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.categoryChipText}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Open API Status Card */}
            <Text style={styles.sectionTitle}>Data Feeds</Text>
            <View style={styles.statusCard}>
              <View style={styles.statusRow}>
                <View style={styles.statusLabelRow}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>Remotive API</Text>
                </View>
                <Text style={styles.statusBadge}>Connected</Text>
              </View>

              <View style={styles.statusRow}>
                <View style={styles.statusLabelRow}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>Arbeitnow API</Text>
                </View>
                <Text style={styles.statusBadge}>Connected</Text>
              </View>
            </View>

            {/* Actions */}
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={handleRefreshCache}
              disabled={isRefreshing}
              activeOpacity={0.8}
            >
              <Text style={styles.actionBtnText}>
                {isRefreshing ? "Refreshing Feeds..." : "🔄 Refresh Job Feeds"}
              </Text>
            </TouchableOpacity>


            <Text style={styles.footerText}>
              Built with Expo SDK 51 & React Native{"\n"}100% Free & Open APIs
            </Text>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default MenuDrawer;
