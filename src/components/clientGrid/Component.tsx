import React, { Component } from 'react'
import { connect, type ConnectedProps } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setClientGrid } from '../../redux/actions/clientActions'
import type { AppDispatch, RootState } from '../../redux/configureStore'
import type { ClientsState } from '../../redux/clients'
import type { WPPost } from '../../types'

import 'react-multi-carousel/lib/styles.css'
import Loading from '../Loading'
import { wpGetFeaturedImage } from '../../shared/wpGetFeaturedImage'
import { Animate } from 'react-simple-animate'

const mapStateToProps = (state: RootState) => ({
  ...state,
})
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  actions: bindActionCreators({ setClientGrid }, dispatch),
})

interface ClientGridOwnProps {
  /** Accepted for the pages that pass it, but the Redux store's clients state takes precedence. */
  clients?: ClientsState
  /** 'edx' shows only the Open edX clients; anything else shows all of them. */
  filter?: string
  isLoading?: boolean
}

const connector = connect<
  ReturnType<typeof mapStateToProps>,
  ReturnType<typeof mapDispatchToProps>,
  ClientGridOwnProps,
  RootState
>(mapStateToProps, mapDispatchToProps)
type ClientGridProps = ConnectedProps<typeof connector> & ClientGridOwnProps

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
class ClientGrid extends Component<ClientGridProps> {
  componentWillUnmount() {
    this.props.actions.setClientGrid()
  }

  filterLogos(logos: WPPost[], filter = 'all') {
    if (filter === 'edx') return logos.filter((logo) => logo.tags.includes(55))
    return logos
  }

  render() {
    const itemList = this.filterLogos(this.props.clients.logos, this.props.filter)

    return (
      <section key="client-grid" aria-label="Client Logos">
        {this.props.isLoading ? (
          <Loading />
        ) : (
          <div id="clients-carousel" className="ml-2 mr-2">
            <div className="row my-2 mx-0 px-0 text-center">
              {itemList.map((client, indx) => {
                return (
                  <ClientCard
                    isSet={this.props.clientGrid.isSet}
                    client={client}
                    indx={indx}
                    key={indx}
                  />
                )
              })}
            </div>
          </div>
        )}
      </section>
    )
  }
}

export default connector(ClientGrid)
