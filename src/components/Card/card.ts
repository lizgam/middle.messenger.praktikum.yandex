import Block from "../../core/Block";

type CardProps = {
    card: CardInfo;
    onDelete: () => void;
    onChooseCard: (card: CardInfo) => void;
    selectedCard?: CardInfo;
    isSelected: boolean;
}

export class Card extends Block {
    static componentName = "Card";
    constructor(props: CardProps) {
        super({
            events: { click: () => { props.onChooseCard(props.card); }, delete: props.onDelete },
            ...props,
        });

        if (props.card && props.selectedCard) {
            const selected: boolean = this.props.card.id == this.props.selectedCard.id ? true : false;
            this.setProps({ isSelected: selected });
        }
    }

    protected render(): string {

        return `
            <div class="card {{#if isSelected}}card_selected{{/if}}">
                {{#if card.avatar}}
                    <img class="card-avatar" src="{{{card.avatar}}}" alt="">
                {{else}}
                    <div class="card-avatar"></div>
                {{/if}}

                <div class="card-info">
                    <div class="card-msg">
                        <h5 class="card-name">{{card.title}}</h5>
                        <p class="card-msg__text">{{card.last_message.content}}</p>
                        {{#if delete}}<span class="card_delete">Delete</span>{{/if}}
                    </div>
                    <div class="card__msg-details">
                        <time class="card__msg-details__msg-time">{{card.last_message.time}}</time>
                        {{#if card.unread_count}}
                            <span class="card__msg-details__msg_counter">{{card.unread_count}}</span>
                        {{/if}}
                        </span>
                    </div>
                </div>
            </div> `;
    }
}
