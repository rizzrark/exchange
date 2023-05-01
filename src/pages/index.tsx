import { Container, Description, FlexContainerRow, Main, Title } from "@/components/sharedstyles"
import { Converter } from "@/components/converter"
import Head from "next/head"

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Exchange Rate</title>
        <meta name="description" content="Currency exchange" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Title>Convert currencies with ease</Title>

        <Description>Just press convert and watch the magic</Description>

        <FlexContainerRow>
          <Converter />
        </FlexContainerRow>
      </Main>
    </Container>
  )
}
