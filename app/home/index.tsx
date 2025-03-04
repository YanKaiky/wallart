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
  ActivityIndicator,
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
import Categories from "@/components/Categories";
import { IFiltersProps } from "@/components/FiltersView";
import { Router, useRouter } from "expo-router";

const HomeScreen = () => {
  const { top } = useSafeAreaInsets();

  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [filters, setFilters] = useState<IFiltersProps | null>(null);
  const [images, setImages] = useState<object[]>([]);
  const [isEndReached, setIsEndReached] = useState<boolean>(false);

  const router: Router = useRouter();

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const modalRef: any = useRef<MutableRefObject<any>>(null);

  const searchInputRef: any = useRef<MutableRefObject<any>>(null);

  const scrollRef: any = useRef<MutableRefObject<any>>(null);

  const paddingTop = top > 0 ? top + 10 : 30;

  useEffect(() => {
    handleImages();
  }, []);

  const handleImages = async (params: object = { page }, append = true) => {
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

  const applyFilters = () => {
    if (filters) {
      setPage(1);
      setImages([]);

      const params: any = {
        page: 1,
        ...filters,
      };

      if (activeCategory) params.category = activeCategory;

      if (search) params.q = search;

      handleImages(params, false);
    }

    closeFiltersModal();
  };

  const resetFilters = () => {
    if (filters) {
      setPage(1);
      setImages([]);
      setFilters(null);

      const params: any = {
        page: 1,
      };

      if (activeCategory) params.category = activeCategory;

      if (search) params.q = search;

      handleImages(params, false);
    }

    closeFiltersModal();
  };

  const handleSearch = async (src: string) => {
    setSearch(src);

    if (src.length >= 3) {
      setImages([]);
      setActiveCategory(null);
      await handleImages({ page: 1, q: src, ...filters }, false);
    }

    if (!src) {
      setImages([]);
      setActiveCategory(null);
      searchInputRef?.current?.clear();
      await handleImages({ page: 1, ...filters }, false);
    }
  };

  const clearSearch = () => {
    setSearch("");
    searchInputRef?.current?.clear();
  };

  const clearThisFilter = (filterName: string) => {
    const curretnFilters: IFiltersProps = { ...filters };

    delete curretnFilters[filterName];

    setFilters({ ...curretnFilters });

    setPage(1);
    setImages([]);

    const params: any = {
      page: 1,
      ...curretnFilters,
    };

    if (activeCategory) params.category = activeCategory;

    if (search) params.q = search;

    handleImages(params, false);
  };

  const handleChangeCategory = (ctgr: string | null) => {
    setActiveCategory(ctgr);
    clearSearch();
    setImages([]);

    const params: any = {
      page,
      ...filters,
    };

    if (ctgr) params.category = ctgr;

    handleImages(params, false);
  };

  const handleSearchDebounce = useCallback(debounce(handleSearch, 400), []);

  const handleScroll = (e: any) => {
    const contentHeight = e.nativeEvent.contentSize.height;
    const scrollViewHeight = e.nativeEvent.layoutMeasurement.height;
    const scrollOffset = e.nativeEvent.contentOffset.y;
    const bottomPosition = contentHeight - scrollViewHeight;

    if (scrollOffset >= bottomPosition - 1) {
      if (!isEndReached) {
        setIsEndReached(true);
        setPage(page + 1);

        const params: any = {
          page: page + 1,
          ...filters,
        };

        if (activeCategory) params.category = activeCategory;

        if (search) params.q = search;

        handleImages(params);
      }
    } else if (isEndReached) {
      setIsEndReached(false);
    }
  };

  const handleScrollUp = () => {
    scrollRef?.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  return (
    <View style={[styles.container, { paddingTop }]}>
      <View style={styles.header}>
        <Pressable onPress={handleScrollUp}>
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

      <ScrollView
        onScroll={handleScroll}
        ref={scrollRef}
        scrollEventThrottle={5}
        contentContainerStyle={{ gap: 15 }}
      >
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

        <View>
          <Categories
            activeCategory={activeCategory}
            handleChangeActive={handleChangeCategory}
          />
        </View>

        {filters && (
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filters}
            >
              {Object.keys(filters).map((key: any) => {
                return (
                  <View key={key} style={styles.filterItem}>
                    {key === "colors" ? (
                      <View
                        style={{
                          height: 20,
                          width: 30,
                          borderRadius: 7,
                          backgroundColor: filters[key],
                        }}
                      />
                    ) : (
                      <Text style={styles.filterItemText}>{filters[key]}</Text>
                    )}

                    <Pressable
                      style={styles.filterCloseIcon}
                      onPress={() => clearThisFilter(key)}
                    >
                      <Ionicons
                        name="close"
                        size={14}
                        color={theme.colors.neutral(0.9)}
                      />
                    </Pressable>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        )}

        <View>
          {images.length > 0 && <ImagesGrid images={images} router={router} />}
        </View>

        <View
          style={{ marginBottom: 70, marginTop: images.length > 0 ? 10 : 70 }}
        >
          <ActivityIndicator size="large" />
        </View>
      </ScrollView>

      <FiltersModal
        modalRef={modalRef}
        filters={filters}
        setFilters={setFilters}
        onClose={closeFiltersModal}
        onApply={applyFilters}
        onReset={resetFilters}
      />
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
  filters: {
    paddingHorizontal: wp(4),
    gap: 10,
  },
  filterItem: {
    backgroundColor: theme.colors.grayBG,
    padding: 8,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: theme.radius.xs,
    gap: 10,
    paddingHorizontal: 10,
  },
  filterItemText: {
    fontSize: hp(1.9),
  },
  filterCloseIcon: {
    backgroundColor: theme.colors.neutral(0.2),
    padding: 4,
    borderRadius: 7,
  },
});

export default HomeScreen;
