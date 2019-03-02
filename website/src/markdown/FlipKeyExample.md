<Flipper
  flipKey={flipCount}
>
  <div className="row">
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
