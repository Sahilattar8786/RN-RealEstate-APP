import { useSignIn } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import LogoScreen from "./Logo";

export default function SignInScreen() {
  const { signIn, errors, fetchStatus } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const isLoading = fetchStatus === "fetching";

  const onSignUpPress=async()=>{
    const {error}=await signIn.password({
      emailAddress:email,
      password,
    })

    if (error) {
      Alert.alert(error.message);
    }
    if(signIn.status === "complete"){
      await signIn.finalize({
        navigate:({decorateUrl})=>{
          const url=decorateUrl("/");
          router.replace(url as any);
        }
      })
    }else if(signIn.status === "needs_second_factor"){
      await signIn.mfa.sendPhoneCode();
    }else if (signIn.status === "needs_client_trust"){
      const emailCodeFactor= signIn.supportedSecondFactors.find(factor=>factor.strategy === "email_code");

      if(emailCodeFactor){
        await signIn.mfa.sendEmailCode();
      }
    }
  }

  const onotpSubmit=async()=>{
    await signIn.mfa.verifyEmailCode({ code });
    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log(session?.currentTask);
            return;
          }
          const url = decorateUrl("/");
          router.replace(url as any);
        },
      });
    } else {
      console.error("Sign-in attempt not complete:", signIn);
    }

  }

  if(signIn.status === "needs_client_trust"){
    const otpSubtitle = `We sent a code to your email ${email}`;
    return (
      <View className="flex-1 justify-center items-center bg-white px-6">
      <LogoScreen title="Verify your email" subtitle={otpSubtitle} />
      <TextInput
        className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4"
        placeholder="Enter code"
        placeholderTextColor="#9CA3AF"
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
        maxLength={6}
      />
      {errors.fields.code && (
        <Text className="text-red-500 mb-4">
          {errors.fields.code.message}
        </Text>
      )}
      <TouchableOpacity
        className="w-full bg-blue-600 py-4 rounded-xl items-center mb-4"
        onPress={onotpSubmit}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-bold text-base">Verify</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => signIn.mfa.sendEmailCode()}
        className="py-2"
      >
        <Text className="text-blue-600">I need a new code</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => signIn.reset()} className="py-2">
        <Text className="text-blue-600">Start over</Text>
      </TouchableOpacity>
    </View>
    )
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="bg-white"
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-1 justify-center px-6 py-12">
        <LogoScreen
          title="Welcome back"
          subtitle="Sign in to your account"
        />

        <TextInput
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4"
          placeholder="Email address"
          placeholderTextColor="#9CA3AF"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.fields.identifier && (
          <Text className="text-red-500 mb-4">
            {errors.fields.identifier.message}
          </Text>
        )}

        <TextInput
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-6"
          placeholder="Password"
          placeholderTextColor="#9CA3AF"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {errors.fields.password && (
          <Text className="text-red-500 mb-4">
            {errors.fields.password.message}
          </Text>
        )}

        <TouchableOpacity
          className="w-full bg-blue-600 py-4 rounded-xl items-center mb-4"
          onPress={onSignUpPress}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-base">Sign In</Text>
          )}
        </TouchableOpacity>

        <View className="flex-row justify-center">
          <Text className="text-gray-500">Don&apos;t have an account? </Text>
          <Link href="/sign-up">
            <Text className="text-blue-600 font-semibold">Sign Up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}