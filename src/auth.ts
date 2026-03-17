import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import Facebook from "next-auth/providers/facebook"
import TikTok from "next-auth/providers/tiktok"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    TikTok({
      clientId: process.env.TIKTOK_CLIENT_KEY,
      clientSecret: process.env.TIKTOK_CLIENT_SECRET,
      authorization: {
        url: "https://www.tiktok.com/v2/auth/authorize/",
        params: {
          client_key: process.env.TIKTOK_CLIENT_KEY,
          scope: "user.info.basic,user.info.profile,user.info.stats",
          response_type: "code",
        },
      },
      token: {
        url: "https://open.tiktokapis.com/v2/oauth/token/",
        params: {
          client_key: process.env.TIKTOK_CLIENT_KEY,
          client_secret: process.env.TIKTOK_CLIENT_SECRET,
        },
      },
      userinfo: {
        url: "https://open.tiktokapis.com/v2/user/info/",
        params: {
          fields: "open_id,union_id,avatar_url,display_name,username,follower_count,following_count,likes_count,video_count",
        },
      },
      profile(profile) {
        return {
          id: profile.data.user.open_id,
          name: profile.data.user.display_name,
          username: profile.data.user.username,
          image: profile.data.user.avatar_url,
          email: null,
          followers: profile.data.user.follower_count,
          likes: profile.data.user.likes_count,
          following: profile.data.user.following_count,
          videos: profile.data.user.video_count,
        }
      },
      checks: ["state"],
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = (user as any).username;
        token.followers = (user as any).followers;
        token.likes = (user as any).likes;
        token.following = (user as any).following;
        token.videos = (user as any).videos;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        (session.user as any).username = token.username;
        (session.user as any).followers = token.followers;
        (session.user as any).likes = token.likes;
        (session.user as any).following = token.following;
        (session.user as any).videos = token.videos;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
  trustHost: true,
})
