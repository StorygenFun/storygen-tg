import { Container } from "@/components/Container/Container";
import { Story } from "@/features/story/Story/StoryController";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function StoryPage({ params }: any) {
  const storyId = params.id;

  return (
    <Container>
      <Story
        storyId={storyId}
        siteUrl={process.env.NEXT_PUBLIC_BASE_URL || "https://storygen.fun"}
        serviceWallet={process.env.NEXT_PUBLIC_SERVICE_WALLET}
      />
    </Container>
  );
}
