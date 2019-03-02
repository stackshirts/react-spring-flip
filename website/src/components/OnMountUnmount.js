import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import template from 'lodash/template'
import Code from 'src/components/Code'
import PageView from 'react-merge-metrics/lib/PageView'
import { Flipper, Flip } from 'react-spring-flip'
import _shuffle from 'lodash/shuffle'

Index.propTypes = {}
Index.defaultProps = {}

const cardsData = [
  {
    id: 0,
    background: 'linear-gradient(-135deg, #FCE38A 0%, #F38181 100%)'
  },
  {
    id: 1,
    background: 'linear-gradient(-135deg, #43E695 0%, #3BB2B8 100%)'
  },
  {
    id: 2,
    background: 'linear-gradient(-135deg, #17EAD9 0%, #6078EA 100%)'
  },
  {
    id: 3,
    background: 'linear-gradient(44deg, #5E2563 0%, #65799B 100%)'
  },
]

export default function Index(props) {

  const [cards, setCards] = useState(cardsData)
  const [flipCount, setCount] = useState(0)

  const shuffleCards = useCallback(() => {
    setCards(_shuffle(cardsData))
    setCount(flipKey => flipKey + 1)
  }, [])

  return (
    <div>

      <button
        onClick={shuffleCards}
        className="btn btn-primary mb-3"
      >
        Shuffle
      </button>

      <Flipper>
        <div
          key={flipCount}
          className="row"
        >
          {cards.map((card) => {
            return (
              <Flip
                positionOnly
                flipId={card.id}
                key={card.background}
                className="col-6 mb-2"
              >
                <div className="card">
                  <div
                    style={{
                      background: card.background
                    }}
                    className="card-body"
                  >
                  </div>
                </div>
              </Flip>
            )
          })}
        </div>
      </Flipper>

    </div>
  )
}

