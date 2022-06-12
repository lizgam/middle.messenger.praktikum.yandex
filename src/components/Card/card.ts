import Block from "../../core/Block";

export interface CardProps {
    users: CardInfo[];
    onDelete: () => void;
    onClick: () => void;
}

export class Card extends Block {
    constructor({ onDelete, onClick, ...props }: CardProps) {
        super({
            events: { select: onClick, delete: onDelete },
            ...props,
        });
    }
    static componentName = "Card";

    protected render(): string {
        return `
            <div class="card {{#if selected}}card_selected{{/if}}">
                {{#if this.avatar}}
                    <img class="card-avatar" src="{{this.avatar}}" alt="">
                {{else}}
                    <div class="card-avatar"></div>
                {{/if}}

                <div class="card-info">
                    <div class="card-msg">
                        <h5 class="card-name">{{this.name}}</h5>
                        <p class="card-msg__text">{{this.message}}</p>
                        {{#if delete}}<span class="card_delete">Delete</span>{{/if}}
                    </div>
                    <div class="card__msg-details">
                        <span class="card__msg-details__msg-time">{{this.date}}</span>
                        {{#if this.count}}
                            <span class="card__msg-details__msg_counter">{{this.count}}</span>
                        {{/if}}
                        </span>
                    </div>
                </div>
            </div> `;
    }
}