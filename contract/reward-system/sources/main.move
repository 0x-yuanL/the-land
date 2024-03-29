module reward_system::main {

    use std::error;
    use std::option;
    use std::signer;
    use std::signer::address_of;
    use std::string;
    use aptos_framework::account;
    use aptos_framework::account::SignerCapability;
    use aptos_framework::event;
    use aptos_framework::object;
    use aptos_framework::object::Object;
    use aptos_token_objects::collection;
    use aptos_token_objects::royalty;
    use aptos_framework::randomness;
    use aptos_token_objects::property_map::read_u64;
    use aptos_token_objects::royalty::init;
    use aptos_token_objects::token;
    use aptos_token_objects::token::Token;
    // ERROR CODE
    const ERROR_NOWNER: u64 = 1;

    const ResourceAccountSeed: vector<u8> = b"resource seed";
    const CollectionDescription: vector<u8> = b"raffle ticket collection description";
    const CollectionName: vector<u8> = b"raffle ticket collection name";
    const CollectionURI: vector<u8> = b"ipfs://QmWmgfYhDWjzVheQyV2TnpVXYnKR25oLWCB2i9JeBxsJbz";
    const TokenPrefix: vector<u8> = b"raffle ticket#";

    const VoucherResourceAccountSeed: vector<u8> = b"vouvher resource seed";
    const VoucherCollectionDescription: vector<u8> = b"Voucher collection description";
    const VoucherCollectionName: vector<u8> = b"Voucher collection name";
    const VoucherCollectionURI: vector<u8> = b"ipfs://QmWmgfYhDWjzVheQyV2TnpVXYnKR25oLWCB2i9JeBxsJbz";
    const VoucherTokenPrefix: vector<u8> = b"Voucher#";
    const ENOT_AUTHORIZED: u64 = 1;

    struct VoucherResourceCap has key {
        cap: SignerCapability
    }

    struct ResourceCap has key {
        cap: SignerCapability
    }

    struct VoucherCollectionRefsStore has key {
        mutator_ref: collection::MutatorRef
    }

    struct CollectionRefsStore has key {
        mutator_ref: collection::MutatorRef
    }

    struct VoucherTokenRefsStore has key {
        mutator_ref: token::MutatorRef,
        burn_ref: token::BurnRef,
        extend_ref: object::ExtendRef,
        transfer_ref: option::Option<object::TransferRef>
    }

    struct TokenRefsStore has key {
        mutator_ref: token::MutatorRef,
        burn_ref: token::BurnRef,
        extend_ref: object::ExtendRef,
        transfer_ref: option::Option<object::TransferRef>
    }

    struct TicketProp has key, store, copy, drop {
        owner: address
    }

    struct VoucherProp has key, store, copy, drop {
        owner: address,
        amout: u64
    }


    #[event]
    struct MintEvent has drop, store {
        owner: address,
        token_id: address,
        ticket_prop: TicketProp
    }

    #[event]
    struct VoucherMintEvent has drop, store {
        owner: address,
        token_id: address,
        voucher_prop: VoucherProp
    }


    #[event]
    struct SetTicketPropEvent has drop, store {
        owner: address,
        token_id: address,
        old_ticket_prop: TicketProp,
        new_ticket_prop: TicketProp
    }

    #[event]
    struct BurnEvent has drop, store {
        owner: address,
        token_id: address,
        ticket_prop: TicketProp
    }


    fun init_module(sender: &signer) {
        // raffle ticket
        init_raffle_collection(sender, ResourceAccountSeed, CollectionDescription, CollectionName, CollectionURI);
        // voucher
        init_voucher_collection(sender, VoucherResourceAccountSeed, VoucherCollectionDescription, VoucherCollectionName, VoucherCollectionURI);
    }

    fun init_raffle_collection(sender: &signer, resourceAccountSeed: vector<u8>, collectionDescription: vector<u8>, collectionName: vector<u8>, collectionURI: vector<u8>) {
        let (resource_signer, resource_cap) = account::create_resource_account(
            sender,
            resourceAccountSeed
        );

        move_to(
            &resource_signer,
            ResourceCap {
                cap: resource_cap
            }
        );

        let collection_cref = collection::create_unlimited_collection(
            &resource_signer,
            string::utf8(collectionDescription),
            string::utf8(collectionName),
            option::some(royalty::create(5, 100, signer::address_of(sender))),
            string::utf8(collectionURI)
        );

        let collection_signer = object::generate_signer(&collection_cref);

        let mutator_ref = collection::generate_mutator_ref(&collection_cref);

        move_to(
            &collection_signer,
            CollectionRefsStore {
                mutator_ref
            }
        );
    }

    fun init_voucher_collection(sender: &signer, resourceAccountSeed: vector<u8>, collectionDescription: vector<u8>, collectionName: vector<u8>, collectionURI: vector<u8>) {
        let (resource_signer, resource_cap) = account::create_resource_account(
            sender,
            resourceAccountSeed
        );

        move_to(
            &resource_signer,
            VoucherResourceCap {
                cap: resource_cap
            }
        );

        let collection_cref = collection::create_unlimited_collection(
            &resource_signer,
            string::utf8(collectionDescription),
            string::utf8(collectionName),
            option::some(royalty::create(5, 100, signer::address_of(sender))),
            string::utf8(collectionURI)
        );

        let collection_signer = object::generate_signer(&collection_cref);

        let mutator_ref = collection::generate_mutator_ref(&collection_cref);

        move_to(
            &collection_signer,
            VoucherCollectionRefsStore {
                mutator_ref
            }
        );
    }

    public(friend) fun get_voucher_amount():u64 {
        let res = 100_000_00u64;
        // let res= 0;
        // let rand = randomness::u64_range(1,1001);
        // // 0.1% 10apt
        // if (rand == 1000u64) {
        //     res = 10_000_000_00u64;
        // } else if (rand > 980u64) { // 2% 2apt
        //     res = 2_000_000_00u64;
        // } else if (rand > 950u64) { // 5% 1apt
        //     res = 1_000_000_00u64;
        // } else if (rand > 700u64) { // 30% 0.1apt
        //     res = 100_000_00u64;
        // };
        return res
    }

    fun inter_vouche_mint(receiver: address, amount: u64) acquires VoucherResourceCap {
        let resource_cap = &borrow_global<VoucherResourceCap>(
            account::create_resource_address(
                &@reward_system,
                VoucherResourceAccountSeed
            )
        ).cap;

        let resource_signer = &account::create_signer_with_capability(
            resource_cap
        );


        let token_cref = token::create_numbered_token(
            resource_signer,
            string::utf8(VoucherCollectionName),
            string::utf8(VoucherCollectionDescription),
            string::utf8(VoucherTokenPrefix),
            string::utf8(b""),
            option::none(),
            string::utf8(b""),
        );
        let selectedUrl = b"https://img2.baidu.com/it/u=3602956762,3556090214&fm=253&fmt=auto&app=138&f=JPEG?w=238&h=232";

        let url = string::utf8(selectedUrl);

        let token_signer = object::generate_signer(&token_cref);

        let token_mutator_ref = token::generate_mutator_ref(&token_cref);

        token::set_uri(&token_mutator_ref, url);

        // create generate_burn_ref
        let token_burn_ref = token::generate_burn_ref(&token_cref);

        move_to(
            &token_signer,
            VoucherTokenRefsStore {
                mutator_ref: token_mutator_ref,
                burn_ref: token_burn_ref,
                extend_ref: object::generate_extend_ref(&token_cref),
                transfer_ref: option::none()
            }
        );


        move_to(
            &token_signer,
            VoucherProp {
                owner: @reward_system,
                amout: amount
            }
        );

        event::emit(
            VoucherMintEvent {
                owner: receiver,
                token_id: object::address_from_constructor_ref(&token_cref),
                voucher_prop: VoucherProp {
                    owner: @reward_system,
                    amout: amount
                }
            }
        );

        object::transfer(
            resource_signer,
            object::object_from_constructor_ref<Token>(&token_cref),
            receiver,
        )

    }

    fun inter_raffle_ticket_mint(sender: &signer, receiver: address) acquires ResourceCap {
        let caller_address = signer::address_of(sender);
        assert!(caller_address == @reward_system, error::permission_denied(ENOT_AUTHORIZED));
        let resource_cap = &borrow_global<ResourceCap>(
            account::create_resource_address(
                &@reward_system,
                ResourceAccountSeed
            )
        ).cap;

        let resource_signer = &account::create_signer_with_capability(
            resource_cap
        );


        let token_cref = token::create_numbered_token(
            resource_signer,
            string::utf8(CollectionName),
            string::utf8(CollectionDescription),
            string::utf8(TokenPrefix),
            string::utf8(b""),
            option::none(),
            string::utf8(b""),
        );
        let selectedUrl = b"https://img2.baidu.com/it/u=3602956762,3556090214&fm=253&fmt=auto&app=138&f=JPEG?w=238&h=232";

        let url = string::utf8(selectedUrl);

        let token_signer = object::generate_signer(&token_cref);

        let token_mutator_ref = token::generate_mutator_ref(&token_cref);

        token::set_uri(&token_mutator_ref, url);

        // create generate_burn_ref
        let token_burn_ref = token::generate_burn_ref(&token_cref);

        move_to(
            &token_signer,
            TokenRefsStore {
                mutator_ref: token_mutator_ref,
                burn_ref: token_burn_ref,
                extend_ref: object::generate_extend_ref(&token_cref),
                transfer_ref: option::none()
            }
        );

        move_to(
            &token_signer,
            TicketProp {
                owner: caller_address
            }
        );

        event::emit(
            MintEvent {
                owner: receiver,
                token_id: object::address_from_constructor_ref(&token_cref),
                ticket_prop: TicketProp {
                    owner: caller_address,
                }
            }
        );

        object::transfer(
            resource_signer,
            object::object_from_constructor_ref<Token>(&token_cref),
            receiver,
        )

    }

    entry public fun mint_raffle_ticket(
        sender: &signer,
        receiver: address
    ) acquires ResourceCap {
        inter_raffle_ticket_mint(sender, receiver);
    }

    // fun mint_voucher(
    //     receiver: address
    // ) acquires VoucherResourceCap {
    //     inter_vouche_mint(receiver);
    // }

    entry fun do_lottery(sender: &signer, object: Object<TicketProp>) acquires TokenRefsStore, TicketProp, VoucherResourceCap {
        burn(sender, object);
        let amount = get_voucher_amount();
        inter_vouche_mint(address_of(sender), amount);
    }

    fun burn(
        sender: &signer,
        object: Object<TicketProp>
    ) acquires TokenRefsStore, TicketProp {
        assert!(object::is_owner(object, signer::address_of(sender)), ERROR_NOWNER);
        let TokenRefsStore {
            mutator_ref: _,
            burn_ref,
            extend_ref: _,
            transfer_ref: _
        } = move_from<TokenRefsStore>(object::object_address(&object));

        let landProp = move_from<TicketProp>(object::object_address(&object));

        event::emit(
            BurnEvent {
                owner: object::owner(object),
                token_id: object::object_address(&object),
                ticket_prop: landProp
            }
        );

        token::burn(burn_ref);
    }

    #[view]
    public fun get_ticketProp(object: Object<TicketProp>): TicketProp acquires TicketProp {
        let  landProp = borrow_global<TicketProp>(object::object_address(&object));
        TicketProp {
            owner: landProp.owner
        }
    }

    inline fun borrow_tikcetProp(owner: address, object: Object<TicketProp>): &TicketProp {
        assert!(object::is_owner(object, owner), ERROR_NOWNER);
        borrow_global<TicketProp>(object::object_address(&object))
    }

    inline fun borrow_mut_ticketProp(owner: address, object: Object<TicketProp>): &mut TicketProp {
        assert!(object::is_owner(object, owner), ERROR_NOWNER);
        borrow_global_mut<TicketProp>(object::object_address(&object))
    }
}