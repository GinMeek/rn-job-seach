import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./welcome.style";
import { icons, SIZES, COLORS } from "../../../constants";

const jobCategories = ["All", "Remote", "Engineering", "React", "Python", "Full-time"];

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");

  const handleCategoryPress = (category) => {
    setActiveCategory(category);
    if (category === "All") {
      router.push("/search/Developer");
    } else {
      router.push(`/search/${category}`);
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Explore Careers 👋</Text>
        <Text style={styles.welcomeMessage}>Find your next tech role</Text>
        <Text style={styles.subtitle}>
          Latest jobs from Remotive & Arbeitnow
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search job title, tech stack, company..."
            placeholderTextColor={COLORS.gray2}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            onSubmitEditing={handleClick}
            returnKeyType="search"
          />
          {searchTerm ? (
            <TouchableOpacity
              onPress={() => setSearchTerm("")}
              style={styles.clearBtn}
            >
              <Text style={styles.clearBtnText}>✕</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image
            style={styles.searchBtnImage}
            source={icons.search}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={jobCategories}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeCategory, item)}
              onPress={() => handleCategoryPress(item)}
            >
              <Text style={styles.tabText(activeCategory, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default Welcome;
