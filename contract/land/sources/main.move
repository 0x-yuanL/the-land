module land::main {

    use std::error;
    use std::option;
    use std::signer;
    use std::string;
    use std::vector;
    use aptos_std::string_utils;
    use aptos_framework::account;
    use aptos_framework::account::SignerCapability;
    use aptos_framework::event;
    use aptos_framework::object;
    use aptos_framework::object::Object;
    use aptos_framework::timestamp;
    use aptos_token_objects::collection;
    use aptos_token_objects::royalty;
    use aptos_token_objects::token;
    use aptos_token_objects::token::Token;
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;
    use aptos_token_objects::aptos_token::{Self, AptosToken};
    const ERROR_NOWNER: u64 = 1;

    const ResourceAccountSeed: vector<u8> = b"resource seed";
    const CollectionDescription: vector<u8> = b"land collection description";
    const CollectionName: vector<u8> = b"land collection name";
    const CollectionURI: vector<u8> = b"ipfs://QmWmgfYhDWjzVheQyV2TnpVXYnKR25oLWCB2i9JeBxsJbz";
    const TokenPrefix: vector<u8> = b"Land#";
    const ENOT_AUTHORIZED: u64 = 1;

    struct ResourceCap has key {
        cap: SignerCapability
    }

    struct CollectionRefsStore has key {
        mutator_ref: collection::MutatorRef
    }

    struct TokenRefsStore has key {
        mutator_ref: token::MutatorRef,
        burn_ref: token::BurnRef,
        extend_ref: object::ExtendRef,
        transfer_ref: option::Option<object::TransferRef>
    }

    struct LandProp has key, store, copy, drop {
        owner: address,
        price: u64,
        lastHarvestTimeStamp: u64
    }

    #[event]
    struct MintEvent has drop, store {
        owner: address,
        token_id: address,
        land_prop: LandProp
    }

    #[event]
    struct SetLandPropEvent has drop, store {
        owner: address,
        token_id: address,
        old_land_prop: LandProp,
        new_land_prop: LandProp
    }

    #[event]
    struct BurnEvent has drop, store {
        owner: address,
        token_id: address,
        land_prop: LandProp
    }


    fun init_module(sender: &signer) {

        let (resource_signer, resource_cap) = account::create_resource_account(
            sender,
            ResourceAccountSeed
        );

        move_to(
            &resource_signer,
            ResourceCap {
                cap: resource_cap
            }
        );

        let collection_cref = collection::create_unlimited_collection(
            &resource_signer,
            string::utf8(CollectionDescription),
            string::utf8(CollectionName),
            option::some(royalty::create(5, 100, signer::address_of(sender))),
            string::utf8(CollectionURI)
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

    entry public fun init_mint(sender: &signer) acquires ResourceCap {
        let caller_address = signer::address_of(sender);
        assert!(caller_address == @land, error::permission_denied(ENOT_AUTHORIZED));
        mint(sender, 100000000u64, timestamp::now_microseconds())
    }

    fun inter_mint(sender: &signer,
                   price: u64,
                   lastHarvestTimeStamp: u64) acquires ResourceCap {
        let caller_address = signer::address_of(sender);
        assert!(caller_address == @land, error::permission_denied(ENOT_AUTHORIZED));
        let resource_cap = &borrow_global<ResourceCap>(
            account::create_resource_address(
                &@land,
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
        let selectedUrl = b"https://img0.baidu.com/it/u=2112609573,2923665802&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500";

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
            LandProp {
                owner: caller_address,
                price,
                lastHarvestTimeStamp
            }
        );

        event::emit(
            MintEvent {
                owner: signer::address_of(sender),
                token_id: object::address_from_constructor_ref(&token_cref),
                land_prop: LandProp {
                    owner: caller_address,
                    price,
                    lastHarvestTimeStamp
                }
            }
        );

        object::transfer(
            resource_signer,
            object::object_from_constructor_ref<Token>(&token_cref),
            signer::address_of(sender),
        )

    }
    fun mint(
        sender: &signer,
        price: u64,
        lastHarvestTimeStamp: u64,
    ) acquires ResourceCap {
        inter_mint(sender, price, lastHarvestTimeStamp);
    }


    entry fun burn(
        sender: &signer,
        object: Object<LandProp>
    ) acquires TokenRefsStore, LandProp {
        assert!(object::is_owner(object, signer::address_of(sender)), ERROR_NOWNER);
        let TokenRefsStore {
            mutator_ref: _,
            burn_ref,
            extend_ref: _,
            transfer_ref: _
        } = move_from<TokenRefsStore>(object::object_address(&object));

        let landProp = move_from<LandProp>(object::object_address(&object));

        event::emit(
            BurnEvent {
                owner: object::owner(object),
                token_id: object::object_address(&object),
                land_prop: landProp
            }
        );

        token::burn(burn_ref);
    }

    entry fun buy_landProp(
        sender: &signer,
        object: Object<LandProp>,
    ) acquires LandProp {
        let oldLandProp = borrow_landProp(signer::address_of(sender), object);
        let newPrice = oldLandProp.price + oldLandProp.price/10;
        let coins = coin::withdraw<AptosCoin>(sender, oldLandProp.price + oldLandProp.price/10);
        // to do: divide the benefit
        coin::deposit(oldLandProp.owner, coins);
        let updatedTimestamp = timestamp::now_microseconds();
        event::emit(
            SetLandPropEvent {
                owner: object::owner(object),
                token_id: object::object_address(&object),
                old_land_prop: *oldLandProp,
                new_land_prop: LandProp {
                    owner: signer::address_of(sender),
                    price: newPrice,
                    lastHarvestTimeStamp: updatedTimestamp
                }
            }
        );
        borrow_mut_landProp(signer::address_of(sender), object).owner = signer::address_of(sender);
        borrow_mut_landProp(signer::address_of(sender), object).price = newPrice;
        borrow_mut_landProp(signer::address_of(sender), object).lastHarvestTimeStamp = updatedTimestamp;
    }

    #[view]
    public fun get_landProp(object: Object<LandProp>): LandProp acquires LandProp {
        let  landProp = borrow_global<LandProp>(object::object_address(&object));
        LandProp {
            owner: landProp.owner,
            price: landProp.price,
            lastHarvestTimeStamp: landProp.lastHarvestTimeStamp
        }
    }

    inline fun borrow_landProp(owner: address, object: Object<LandProp>): &LandProp {
        assert!(object::is_owner(object, owner), ERROR_NOWNER);
        borrow_global<LandProp>(object::object_address(&object))
    }

    inline fun borrow_mut_landProp(owner: address, object: Object<LandProp>): &mut LandProp {
        assert!(object::is_owner(object, owner), ERROR_NOWNER);
        borrow_global_mut<LandProp>(object::object_address(&object))
    }
}