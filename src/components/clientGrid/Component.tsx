import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector, useClients } from '../../redux/hooks'
import { entryAnimationPlayed } from '../../redux/uiSlice'
import type { WPPost } from '../../types'

import 'react-multi-carousel/lib/styles.css'
import Loading from '../Loading'
import { wpGetFeaturedImage } from '../../shared/wpGetFeaturedImage'
import { Animate } from 'react-simple-animate'

interface ClientGridProps {
  /** 'edx' shows only the Open edX clients; anything else shows all of them. */
  filter?: string
}

interface ClientCardProps {
  client: WPPost
  indx: number
  isSet: boolean
}

const ClientCard = (props: ClientCardProps) => {
  const client_logo = wpGetFeaturedImage(props.client)
  const background_url = "url('" + client_logo + "')"
  const item_style = {
    backgroundImage: background_url,
  }
  const client_url = props.client?.acf?.url

  return (
    <article
      className="col-lg-4 col-md-6 col-sm-12"
      key={props.indx}
      aria-label={props.client.title.rendered}
    >
      <div className="client-item my-2 px-0 py-1">
        {!props.isSet ? (
          <Animate play start={{ opacity: 0 }} end={{ opacity: 1 }}>
            <div className="client-image" style={item_style} />
          </Animate>
        ) : (
          <React.Fragment>
            {client_url ? (
              <a
                href={client_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={props.client?.title?.rendered + ' Website'}
                title={props.client?.title?.rendered}
              >
                <div className="client-image" style={item_style} />
              </a>
            ) : (
              <div className="client-image" style={item_style} />
            )}
          </React.Fragment>
        )}
      </div>
    </article>
  )
}
function filterLogos(logos: WPPost[], filter = 'all') {
  if (filter === 'edx') return logos.filter((logo) => logo.tags.includes(55))
  return logos
}

const ClientGrid = ({ filter }: ClientGridProps) => {
  const clients = useClients()
  const isSet = useAppSelector((state) => state.ui.entryAnimationsPlayed.clientGrid)
  const dispatch = useAppDispatch()

  // the logos fade in only on the grid's first visit: record that it has been
  // shown when it unmounts, so that it doesn't stop its own animation.
  useEffect(() => {
    return () => {
      dispatch(entryAnimationPlayed('clientGrid'))
    }
  }, [dispatch])

  const itemList = filterLogos(clients.data, filter)

  return (
    <section key="client-grid" aria-label="Client Logos">
      {clients.isLoading ? (
        <Loading />
      ) : (
        <div id="clients-carousel" className="ml-2 mr-2">
          <div className="row my-2 mx-0 px-0 text-center">
            {itemList.map((client, indx) => {
              return <ClientCard isSet={isSet} client={client} indx={indx} key={indx} />
            })}
          </div>
        </div>
      )}
    </section>
  )
}

export default ClientGrid
