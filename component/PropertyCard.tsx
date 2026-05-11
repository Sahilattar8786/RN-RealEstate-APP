import { Property } from "@/types";
import { Image, Text, View } from "react-native";
const PropertyCard = ({ property }: { property: Property }) => {
    const CARD_WIDTH = 288;  // equivalent to w-72
    const IMAGE_HEIGHT = 176; // equivalent to h-44
    return (
        <View>
            <Image
            source={{uri:property.images[0]}}
            resizeMode="cover"
            style={{ width: CARD_WIDTH, height: IMAGE_HEIGHT }}
            />
            <Text>{property.title}</Text>
        </View>
    )
}
export default PropertyCard;