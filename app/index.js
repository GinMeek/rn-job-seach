import { useState, useCallback } from "react";
import { View, ScrollView, SafeAreaView, RefreshControl } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES } from "../constants";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
  MenuDrawer,
  AboutModal,
} from "../components";
import jobService from "../services/jobService";

const Home = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await jobService.fetchAllJobs({ forceRefresh: true });
      setRefreshKey((prev) => prev + 1);
    } catch (err) {
      console.warn("Refresh error:", err);
    } finally {
      setRefreshing(false);
    }
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.lightWhite,
      }}
    >
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.menu}
              dimension="60%"
              handlePress={() => setMenuVisible(true)}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={images.logo}
              dimension="80%"
              handlePress={() => setAboutVisible(true)}
            />
          ),
          headerTitle: "",
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.accent]}
          />
        }
      >
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
            paddingBottom: 40,
          }}
        >
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            handleClick={() => {
              if (searchTerm.trim()) {
                router.push(`/search/${encodeURIComponent(searchTerm.trim())}`);
              }
            }}
          />
          <Popularjobs
            key={`popular-${refreshKey}`}
            activeTab={activeCategory}
          />
          <Nearbyjobs key={`nearby-${refreshKey}`} />
        </View>
      </ScrollView>

      {/* Interactive Menu Drawer */}
      <MenuDrawer
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onRefreshData={onRefresh}
      />

      {/* About App Modal */}
      <AboutModal
        visible={aboutVisible}
        onClose={() => setAboutVisible(false)}
      />
    </SafeAreaView>
  );
};

export default Home;
