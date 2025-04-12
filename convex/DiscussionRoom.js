import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateNewRoom=mutation({
    args:{
            coachingOptions:v.string(),
                topic:v.string(),
                expertName:v.string(),
                uid:v.id('users'),
    },
    handler:async(ctx,args)=>{
        const data={
            coachingOptions:args.coachingOptions,
            topic:args.topic,
            expertName:args.expertName,
            uid:args.uid,
        }
        const result=await ctx.db.insert("DiscussionRoom",{...data});
        return result;
    },
})

export const GetDiscussionRoom=query({
    args:{
        id:v.id('DiscussionRoom')
    },
    handler:async(ctx,args)=>{
        const result=await ctx.db.get(args.id);
        return result;
    },
})

export const UpdateConversation=mutation({
    args:{
        id:v.id('DiscussionRoom'),
        conversation:v.any(),
    },
    handler:async(ctx,args)=>{
        await ctx.db.patch(args.id,{conversation:args.conversation});
    },
})

export const UpdateSummery=mutation({
    args:{
        id:v.id('DiscussionRoom'),
        summery:v.any(),
    },
    handler:async(ctx,args)=>{
        await ctx.db.patch(args.id,{summery:args.summery});
    },
})


export const GetAllDiscussionRoom=query({
    args:{
        uid:v.id('users')
    },
    handler:async(ctx,args)=>{
        const result=await ctx.db.query('DiscussionRoom').filter(q=>q.eq(q.field('uid'),args.uid)).order('desc')
        .collect();
        return result;
    },
})