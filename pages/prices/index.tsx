export default function Prices() {
  return <></>
}

export async function getServerSideProps(context) {
  // deprecated
  return {
    redirect: {
      destination: '/',
      permanent: true,
    },
  }
}
