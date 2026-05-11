import { formatPrice } from "@/lib/utils";
import { Property } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CARD_WIDTH = 288;
const IMAGE_HEIGHT = 176;

export default function FeaturedCard({ property }: { property: Property }) {
  const router = useRouter();

  return (
    <View style={[s.shadowWrap, { opacity: property.is_sold ? 0.5 : 1 }]}>
      <TouchableOpacity
        onPress={() => router.push(`/property/${property.id}` as any)}
        style={s.card}
      >
        <View style={s.imageWrapper}>
          <Image
            source={{ uri: property.images[0] }}
            style={s.image}
            resizeMode="cover"
          />

          {/* Badges are inside image layer so they always render on top-left/right */}
          <View style={s.badgeLeft}>
            <Text style={s.badgeLeftText}>{property.type}</Text>
          </View>

          {property.is_sold && (
            <View style={s.badgeRight}>
              <Text style={s.badgeRightText}>Sold</Text>
            </View>
          )}
        </View>

        {/* Info */}
        <View style={s.info}>
          <Text style={s.title} numberOfLines={1}>{property.title}</Text>

          <View style={s.row}>
            <Ionicons name="location-outline" size={13} color="#6B7280" />
            <Text style={s.subText} numberOfLines={1}>
              {property.address}, {property.city}
            </Text>
          </View>

          <View style={s.metaRow}>
            <Text style={s.priceText}>
              {formatPrice(property.price)}
            </Text>
            <View style={s.row}>
              <Ionicons name="bed-outline" size={13} color="#6B7280" />
              <Text style={s.subText}>{property.bedrooms}</Text>
            </View>
            <View style={[s.row, { marginLeft: 12 }]}>
              <Ionicons name="water-outline" size={13} color="#6B7280" />
              <Text style={s.subText}>{property.bathrooms}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  shadowWrap: {
    width: CARD_WIDTH,
    marginRight: 16,
    marginBottom: 10,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    backgroundColor: "transparent",
  },
  card: {
    width: CARD_WIDTH,
    borderRadius: 24,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  imageWrapper: {
    width: CARD_WIDTH,
    height: IMAGE_HEIGHT,
    position: "relative",
  },
  image: {
    width: CARD_WIDTH,
    height: IMAGE_HEIGHT,
  },
  badgeLeft: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "rgba(255,255,255,0.92)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeLeftText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#2563EB",
    textTransform: "capitalize",
  },
  badgeRight: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#EF4444",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeRightText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#fff",
  },
  info: {
    padding: 16,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  priceText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2563EB",
  },
  subText: {
    fontSize: 12,
    color: "#6B7280",
  },
});