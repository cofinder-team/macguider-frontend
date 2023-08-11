import { certificate } from 'utils/auth'

export default function Certificate() {
  return <></>
}

export async function getServerSideProps(context) {
  const { uuid } = context.query

  try {
    await certificate(uuid)

    return {
      redirect: {
        destination: `/login?uuid=${uuid}`,
        permanent: false,
      },
    }
  } catch {
    return {
      redirect: {
        destination: '/signup',
        permanent: false,
      },
    }
  }
}
