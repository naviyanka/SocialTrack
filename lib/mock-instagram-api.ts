import { faker } from "@faker-js/faker"

// Types
export type InstagramProfile = {
  id: string
  username: string
  full_name: string
  profile_picture: string
  bio: string
  website: string
  is_business: boolean
  follows_count: number
  followers_count: number
  media_count: number
}

export type InstagramFollower = {
  id: string
  username: string
  full_name: string
  profile_picture: string
  followed_at: string
}

export type InstagramPost = {
  id: string
  caption: string
  media_url: string
  permalink: string
  media_type: string
  timestamp: string
  like_count: number
  comments_count: number
  engagement_rate: number
}

export type InstagramInsight = {
  date: string
  follower_count: number
  following_count: number
  gained_followers: number
  lost_followers: number
  likes_received: number
  comments_received: number
  engagement_rate: number
}

// Mock Instagram API service
export const MockInstagramAPI = {
  // Authenticate with Instagram
  async authenticate(code: string) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      access_token: "mock_access_token_" + Math.random().toString(36).substring(2, 15),
      user_id: faker.string.uuid(),
    }
  },

  // Get user profile
  async getUserProfile(): Promise<InstagramProfile> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    return {
      id: faker.string.uuid(),
      username: faker.internet.userName().toLowerCase(),
      full_name: faker.person.fullName(),
      profile_picture: faker.image.avatar(),
      bio: faker.lorem.sentence(),
      website: faker.internet.url(),
      is_business: faker.datatype.boolean(),
      follows_count: faker.number.int({ min: 100, max: 2000 }),
      followers_count: faker.number.int({ min: 1000, max: 50000 }),
      media_count: faker.number.int({ min: 10, max: 500 }),
    }
  },

  // Get followers
  async getFollowers(
    limit = 50,
    after?: string,
  ): Promise<{ data: InstagramFollower[]; has_more: boolean; end_cursor?: string }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1200))

    const followers: InstagramFollower[] = Array.from({ length: limit }, () => ({
      id: faker.string.uuid(),
      username: faker.internet.userName().toLowerCase(),
      full_name: faker.person.fullName(),
      profile_picture: faker.image.avatar(),
      followed_at: faker.date.past().toISOString(),
    }))

    return {
      data: followers,
      has_more: faker.datatype.boolean(),
      end_cursor: faker.string.alphanumeric(16),
    }
  },

  // Get recent posts
  async getPosts(limit = 20): Promise<InstagramPost[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return Array.from({ length: limit }, () => ({
      id: faker.string.uuid(),
      caption: faker.lorem.sentences(2),
      media_url: `https://picsum.photos/seed/${faker.string.alphanumeric(8)}/500/500`,
      permalink: faker.internet.url(),
      media_type: faker.helpers.arrayElement(["IMAGE", "VIDEO", "CAROUSEL_ALBUM"]),
      timestamp: faker.date.recent().toISOString(),
      like_count: faker.number.int({ min: 50, max: 5000 }),
      comments_count: faker.number.int({ min: 0, max: 500 }),
      engagement_rate: Number.parseFloat(faker.number.float({ min: 1, max: 10, precision: 0.1 }).toFixed(1)),
    }))
  },

  // Get insights
  async getInsights(days = 30): Promise<InstagramInsight[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const today = new Date()
    let followerCount = faker.number.int({ min: 10000, max: 15000 })
    let followingCount = faker.number.int({ min: 500, max: 1000 })

    return Array.from({ length: days }, (_, i) => {
      const date = new Date(today)
      date.setDate(today.getDate() - (days - i - 1))

      const gainedFollowers = faker.number.int({ min: 10, max: 500 })
      const lostFollowers = faker.number.int({ min: 0, max: 100 })

      // Update follower count for next day
      const previousFollowerCount = followerCount
      followerCount += gainedFollowers - lostFollowers

      // Update following count for next day
      const followingDelta = faker.number.int({ min: -10, max: 30 })
      followingCount += followingDelta

      const likesReceived = faker.number.int({ min: 500, max: 5000 })
      const commentsReceived = faker.number.int({ min: 50, max: 500 })

      return {
        date: date.toISOString().split("T")[0],
        follower_count: previousFollowerCount,
        following_count: followingCount - followingDelta,
        gained_followers: gainedFollowers,
        lost_followers: lostFollowers,
        likes_received: likesReceived,
        comments_received: commentsReceived,
        engagement_rate: Number.parseFloat(
          (((likesReceived + commentsReceived) / previousFollowerCount) * 100).toFixed(1),
        ),
      }
    })
  },

  // Get follower growth
  async getFollowerGrowth(days = 90): Promise<{ date: string; followers: number }[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const today = new Date()
    let followerCount = faker.number.int({ min: 10000, max: 15000 })

    return Array.from({ length: days }, (_, i) => {
      const date = new Date(today)
      date.setDate(today.getDate() - (days - i - 1))

      const delta = faker.number.int({ min: -50, max: 200 })
      followerCount += delta

      return {
        date: date.toISOString().split("T")[0],
        followers: followerCount - delta,
      }
    })
  },

  // Simulate follower activity (follows/unfollows)
  async getFollowerActivity(days = 7): Promise<
    {
      id: string
      username: string
      full_name: string
      profile_picture: string
      action: "follow" | "unfollow"
      timestamp: string
    }[]
  > {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 900))

    const today = new Date()
    const activities = []

    for (let i = 0; i < days; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)

      // Generate 5-20 activities per day
      const activityCount = faker.number.int({ min: 5, max: 20 })

      for (let j = 0; j < activityCount; j++) {
        const timestamp = new Date(date)
        timestamp.setHours(faker.number.int({ min: 0, max: 23 }))
        timestamp.setMinutes(faker.number.int({ min: 0, max: 59 }))

        activities.push({
          id: faker.string.uuid(),
          username: faker.internet.userName().toLowerCase(),
          full_name: faker.person.fullName(),
          profile_picture: faker.image.avatar(),
          action: faker.helpers.arrayElement(["follow", "unfollow"]) as "follow" | "unfollow",
          timestamp: timestamp.toISOString(),
        })
      }
    }

    // Sort by timestamp (most recent first)
    return activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  },

  // Generate suspicious activities
  async getSuspiciousActivities(): Promise<
    { id: string; type: string; description: string; severity: string; created_at: string }[]
  > {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 700))

    const activityTypes = [
      {
        type: "mass_unfollow",
        description: "You lost {count} followers in the last hour, which is {percent}% above your normal rate.",
        severity: "high",
      },
      {
        type: "engagement_drop",
        description: "Your last {count} posts have {percent}% less engagement than your average.",
        severity: "medium",
      },
      {
        type: "ghost_followers",
        description: "You have {count} followers who haven't engaged with your content in 90+ days.",
        severity: "low",
      },
      {
        type: "unusual_activity",
        description: "Unusual login activity detected from {location}.",
        severity: "high",
      },
      {
        type: "comment_spam",
        description: "Detected {count} potential spam comments on your recent posts.",
        severity: "medium",
      },
    ]

    // Generate 0-3 suspicious activities
    const count = faker.number.int({ min: 0, max: 3 })

    return Array.from({ length: count }, () => {
      const activityType = faker.helpers.arrayElement(activityTypes)
      let description = activityType.description

      // Replace placeholders in description
      description = description.replace("{count}", faker.number.int({ min: 10, max: 500 }).toString())
      description = description.replace("{percent}", faker.number.int({ min: 20, max: 300 }).toString())
      description = description.replace("{location}", faker.location.city() + ", " + faker.location.country())

      return {
        id: faker.string.uuid(),
        type: activityType.type,
        description,
        severity: activityType.severity,
        created_at: faker.date.recent().toISOString(),
      }
    })
  },
}

// Install faker.js:
// npm install @faker-js/faker --save-dev
