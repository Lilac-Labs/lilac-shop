import CollectionComponents from './collection-components'

export default async function Page({
  params,
}: {
  params: { collectionId: string }
}) {
  return (
    <>
      <CollectionComponents collectionId={params.collectionId} />
    </>
  )
}
