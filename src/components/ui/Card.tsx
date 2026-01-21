import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "inverse" | "accent";
}

export function Card({ className, variant = "default", children, ...props }: CardProps) {
    const variants = {
        default: "bg-black border-2 border-white text-white shadow-[8px_8px_0px_0px_#ffffff]",
        inverse: "bg-white border-2 border-black text-black shadow-[8px_8px_0px_0px_#000000]",
        accent: "bg-accent border-2 border-black text-black shadow-[8px_8px_0px_0px_#ffffff]",
    };

    return (
        <div
            className={cn(
                "p-6 md:p-8 relative",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
