import { ValidationRule } from "../../utilities/validation";
import { CardsGroupStub } from "../../data/data";
import Block from "../../core/Block";

interface AddgroupProps {
    onCreate: () => void;
    users: CardInfo[];
    avatar: string;
}

export class Addgroup extends Block<AddgroupProps> {
    constructor({ onCreate, ...props }: AddgroupProps) {
        super({
            ...props,
            users: CardsGroupStub,
            onCreate: () => {
                // console.log("Group created");
            },
        });
    }

    static componentName = "Addgroup";

    render() {
        return `
        <section class="messages-board form_container addgroup_mode">
            <form action="#" method="post">
                <div class="avatar_block">
                    {{#if avatar}}
                        <img src="{{avatar}}" alt="group avatar">
                    {{else}}
                        <div class="profile-avatar"></div>
                    {{/if}}
                    <span class="form_edit avatar_block__span">Edit</span>
                </div>
                {{{ InputControl label="Group Name" id="group_name" name="group_name" ref="group_name" inputType="text" validationRule = "${ValidationRule.First_name}"}}}
                {{{ InputControl label="Add new member" placeholder="Enter member name" inputType="search" }}}
                {{#each users}}
                    {{{ Card
                        ref="card"
                        name=this.name
                        avatar=this.avatar
                        delete=true
                    }}}
                {{/each}}
                {{{ Button ref="create_btn" btnText="Create group" onClick=onCreate }}}
            </form>
        </section>

        `;
    }
}
