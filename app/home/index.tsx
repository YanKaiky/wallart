import Categories from "@/components/Categories";
import ImagesGrid from "@/components/ImagesGrid";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";
import ImagesService, { IhandleImagesResponse } from "@/services/images/images";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { debounce } from "lodash";
import FiltersModal from "@/components/FiltersModal";

const HomeScreen = () => {
  const { top } = useSafeAreaInsets();

  const [search, setSearch] = useState<string>("");
  const [images, setImages] = useState<object[]>([]);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const modalRef: any = useRef<MutableRefObject<any>>(null);

  const searchInputRef: any = useRef<MutableRefObject<any>>(null);

  const paddingTop = top > 0 ? top + 10 : 30;

  useEffect(() => {
    handleImages();
  }, []);

  const handleImages = async (params: object = { page: 1 }, append = true) => {
    const response: IhandleImagesResponse = await ImagesService.getImages(
      params
    );

    if (response.success) {
      if (append) {
        setImages([...images, ...response.data]);
      } else {
        setImages(response.data);
      }
    }
  };

  const openFiltersModal = () => {
    modalRef?.current?.present();
  };

  const closeFiltersModal = () => {
    modalRef?.current?.close();
  };

  const handleSearch = async (src: string) => {
    setSearch(src);

    if (src.length >= 3) {
      setImages([]);
      setActiveCategory(null);
      await handleImages({ page: 1, q: src }, false);
    }

    if (!src) {
      setImages([]);
      setActiveCategory(null);
      searchInputRef?.current?.clear();
      await handleImages({ page: 1 }, false);
    }
  };

  const clearSearch = () => {
    setSearch("");
    searchInputRef?.current?.clear();
  };

  const handleChangeCategory = (ctgr: string | null) => {
    setActiveCategory(ctgr);
    clearSearch();
    setImages([]);

    const params: any = {
      page: 1,
    };

    if (ctgr) params.category = ctgr;

    handleImages(params, false);
  };

  const handleSearchDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <View style={[styles.container, { paddingTop }]}>
      <View style={styles.header}>
        <Pressable>
          <Text style={styles.title}>Wallart</Text>
        </Pressable>
        <Pressable onPress={openFiltersModal}>
          <FontAwesome6
            name="bars-staggered"
            size={22}
            color={theme.colors.neutral(0.7)}
          />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ gap: 15 }}>
        <View style={styles.searchBar}>
          <View style={styles.searchIcon}>
            <Feather
              name="search"
              size={24}
              color={theme.colors.neutral(0.4)}
            />
          </View>
          <TextInput
            placeholder="Search for photos..."
            ref={searchInputRef}
            style={styles.searchInput}
            onChangeText={handleSearchDebounce}
          />
          {search && (
            <Pressable
              style={styles.closeIcon}
              onPress={() => handleSearch("")}
            >
              <Ionicons
                name="close"
                size={24}
                color={theme.colors.neutral(0.6)}
              />
            </Pressable>
          )}
        </View>

        <View style={styles.categories}>
          <Categories
            activeCategory={activeCategory}
            handleChangeActive={handleChangeCategory}
          />
        </View>

        <View>{images.length > 0 && <ImagesGrid images={images} />}</View>
      </ScrollView>

      <FiltersModal modalRef={modalRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },
  header: {
    marginHorizontal: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: hp(4),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.neutral(0.9),
  },
  searchBar: {
    marginHorizontal: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    backgroundColor: theme.colors.white,
    padding: 6,
    paddingLeft: 10,
    borderRadius: theme.radius.md,
  },
  searchIcon: {
    padding: 8,
  },
  searchInput: {
    flex: 1,
    borderRadius: theme.radius.sm,
    paddingVertical: 10,
    fontSize: hp(1.8),
  },
  closeIcon: {
    backgroundColor: theme.colors.neutral(0.1),
    padding: 8,
    borderRadius: theme.radius.sm,
  },
  categories: {},
});

export default HomeScreen;
