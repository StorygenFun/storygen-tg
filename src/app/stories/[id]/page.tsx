import { Container } from "@/components/Container/Container";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function StoryPage({ params }: any) {
  const storyId = params.id;
  console.log("🚀 ~ StoryPage ~ storyId:", storyId);

  return <Container>Story will be here</Container>;
}
