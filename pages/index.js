import Error from 'next/error'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getTuitionCalculator } from '@/lib/sanity-api'
import { Flex, Heading } from '@chakra-ui/react'
import { Text as BodyText } from '@/components/serializers/text'
import { Layout } from '@/components/layout'


export default function Home ({ pageData }) {

  const router = useRouter()

  if (!router.isFallback && !pageData) {
    return <Error statusCode={404} />
  }

  const siteSettings = pageData[0] && pageData[0].siteSettings
  const tuitionCalculator = pageData[0] && pageData[0].tuitionCalculator
  const { questions, categories } = tuitionCalculator

  return (
    <Layout siteSettings={siteSettings}>
      <Flex mt={24} flexDir="column">
      <Heading mb="2">{tuitionCalculator.title}</Heading>
      <BodyText blocks={tuitionCalculator.description} />
      <Link href={`/question/${questions[0]._id}`}>
        <a style={{textDecoration: 'underline'}}>Get Started</a>
      </Link>
      </Flex>
    </Layout>
  )
}

export async function getStaticProps ({ preview = false }) {
  const pageData = await getTuitionCalculator(preview)
  return {
    props: { pageData, preview },
    revalidate: 60
  }
}
