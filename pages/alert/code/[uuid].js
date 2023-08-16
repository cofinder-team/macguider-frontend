import { emailDeleteAlert } from 'utils/alert'

export default function Alert() {
  return <></>
}

export async function getServerSideProps(context) {
  const { uuid } = context.query

  try {
    await emailDeleteAlert(uuid)

    return {
      redirect: {
        destination: '/my',
        permanent: false,
      },
    }
  } catch {
    return {
      redirect: {
        destination: '/my',
        permanent: false,
      },
    }
  }
}
