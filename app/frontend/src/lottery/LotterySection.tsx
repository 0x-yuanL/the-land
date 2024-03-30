import React, {useEffect, useState} from "react";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import {Card, MenuProps, MenuTheme} from 'antd';
import {Button, Menu, notification } from "antd";
import axios from "axios";
import type { NotificationArgsProps } from 'antd'
import {useWallet} from "@aptos-labs/wallet-adapter-react";
import {aptos, getOwnedRaffleTickets, getOwnedVouchers, REWARD_SYSTEM_CONTRACT_ADDRESS} from "../utils";
import {Nft} from "../utils/types";
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Navigation', 'sub1', <MailOutlined />, [
        getItem('Buy raffle ticket', '1'),
        getItem('Go lottery', '2'),
        getItem('My Vouchers', '3'),
    ]),
];
const Context = React.createContext({ name: 'Default' });
type NotificationPlacement = NotificationArgsProps['placement'];
const containerStyle: React.CSSProperties = { display: "flex" };
const childContainerStyle : React.CSSProperties = { marginRight: "20px" };
export const LotterySection = () => {
    const [theme, setTheme] = useState<MenuTheme>('light');
    const [current, setCurrent] = useState('1');
    const [api, contextHolder] = notification.useNotification();
    const { account, signAndSubmitTransaction } = useWallet();
    const [numRt, setNumRt] = useState(0);
    const [raffleTickets, setRaffleTickets] = useState<Nft[]>([]);
    const [vouchers, setVouchers] = useState<Nft[]>([]);

    const openNotification = (placement: NotificationPlacement, content: string) => {
        api.info({
            message: `Notification`,
            description: <Context.Consumer>{({ name }) => `${content}!`}</Context.Consumer>,
            placement,
        });
    };
    const changeTheme = (value: boolean) => {
        setTheme(value ? 'light' : 'dark');
    };

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    const buyRaffleTicket = () => {
        if (account) {
            axios.get('/api/stone/mint/' + account.address)
                .then(response => {
                    openNotification('topRight', 'You bought a raffle ticket!')
                    setNumRt(numRt + 1);
                });
        }
    }

    const doLottery = async () => {
        let raffleTicketAddress;
        if (numRt != 0) {
            let nft = raffleTickets.pop();
            if (nft) {
                raffleTicketAddress = nft.address
            }
        }
        if (account && raffleTicketAddress) {
            try {
                const response = await signAndSubmitTransaction({
                    sender: account.address,
                    data: {
                        function: `${REWARD_SYSTEM_CONTRACT_ADDRESS}::main::do_lottery`,
                        typeArguments: [],
                        functionArguments: [raffleTicketAddress],
                    },
                });
                await aptos
                    .waitForTransaction({
                        transactionHash: response.hash,
                    }).then(() => {
                        setNumRt(numRt - 1);
                        openNotification('topRight', 'You got a voucher!')
                    });
            } catch (error: any) {

            }

        }
    }

    useEffect(() => {
        if (account) {
            let ownedRaffleTickets = getOwnedRaffleTickets(account.address);
            ownedRaffleTickets.then(res => {
                if (res) {
                    setRaffleTickets(res);
                    setNumRt(res.length);
                }
            })
        }
    }, [account?.address, getOwnedRaffleTickets, numRt]);

    useEffect(() => {
        if (account) {
            let ownedVouchers = getOwnedVouchers(account.address);
            ownedVouchers.then(res => {
                if (res) {
                    setVouchers(res);
                    console.log(res)
                }
            })
        }
    }, [account?.address, getOwnedVouchers, numRt]);

    return (
        <> {contextHolder}
            <div style={containerStyle}>
                <div style={childContainerStyle}>
                    <Menu
                        theme={theme}
                        onClick={onClick}
                        style={{width: 256, margin: 10}}
                        defaultOpenKeys={['sub1']}
                        selectedKeys={[current]}
                        mode="inline"
                        items={items}
                    />
                </div>
                <div style={childContainerStyle}>
                    {current == "1" && <div>
                        <h1>Buy raffle ticket</h1>
                        100 stone / Ticket <Button type="primary" onClick={buyRaffleTicket} >Pay</Button>
                    </div> }
                    {current == "2" && <div>
                        <h1>Go lottery</h1>
                        <p>You own {numRt} raffle tickets</p>
                        <Button type="primary" onClick={doLottery}>Do lottery</Button>
                    </div> }
                    {current == "3" && <div>
                        <h1>My Vouchers</h1>
                        <div style={{display: "flex", flexWrap: "wrap"}} className="ant-flex css-dev-only-do-not-override-42nv3w ant-flex-wrap-wrap ant-flex-gap-small">
                            {vouchers.map((voucher) => (
                                    <Card title={voucher.tokenData.name} extra={<a href="#">More</a>} style={{ width: 300, margin: 10 }}>
                                        <p style={{ wordWrap : "break-word" }}>{voucher.address}</p>
                                    </Card>
                            )
                            )}
                        </div>
                    </div> }
                </div>
            </div>


        </>
    );
};